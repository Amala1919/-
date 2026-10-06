#!/usr/bin/env python3
"""Download the lead image of each Wikipedia article listed in scripts/images.json.

Only freely licensed files hosted on Wikimedia Commons are used (public domain,
CC0, CC BY, CC BY-SA, GFDL ...). For each image we store a resized JPEG plus a
thumbnail in web/public/img and the author/license in
web/src/data/image-credits.json so the app can show proper attribution.

Runs on GitHub Actions (.github/workflows/images.yml). Incremental: images that
are already present are not downloaded again.
"""
import html
import io
import json
import os
import re
import sys
import time

import requests
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, 'scripts', 'images.json')
IMG_DIR = os.path.join(ROOT, 'web', 'public', 'img')
CREDITS = os.path.join(ROOT, 'web', 'src', 'data', 'image-credits.json')
REPORT = os.path.join(ROOT, 'scripts', 'images-report.txt')

MAIN_BOX = (640, 640)
THUMB_BOX = (240, 240)
FREE = re.compile(r'public domain|^pd|cc0|cc[- ]?by|gfdl|gpl|kogl|ogl|attribution|no restrictions|copyrighted free use', re.I)

S = requests.Session()
S.headers['User-Agent'] = 'ChronoAtlasImageFetcher/1.0 (https://github.com/Amala1919/-; educational history app)'


def get(url, **kw):
    for attempt in range(6):
        try:
            r = S.get(url, timeout=40, **kw)
        except requests.RequestException:
            time.sleep(2 ** attempt)
            continue
        if r.status_code == 429 or r.status_code >= 500:
            time.sleep(min(60, 2 ** attempt * 2))
            continue
        return r
    return None


def api(host, params):
    r = get(f'https://{host}/w/api.php', params={**params, 'format': 'json', 'formatversion': '2'})
    return r.json() if r is not None and r.ok else {}


def chunks(xs, n):
    for i in range(0, len(xs), n):
        yield xs[i:i + n]


def clean(value, limit=90):
    text = html.unescape(re.sub(r'<[^>]+>', ' ', value or ''))
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:limit - 1] + '…' if len(text) > limit else text


def lead_images(titles):
    """title -> Commons file name (without 'File:')"""
    out = {}
    for batch in chunks(titles, 40):
        data = api('en.wikipedia.org', {
            'action': 'query', 'prop': 'pageimages', 'piprop': 'name', 'pilicense': 'free',
            'redirects': 1, 'titles': '|'.join(batch),
        }).get('query', {})
        alias = {}
        for n in data.get('normalized', []):
            alias[n['from']] = n['to']
        redirects = {r['from']: r['to'] for r in data.get('redirects', [])}
        pages = {p['title']: p for p in data.get('pages', [])}
        for t in batch:
            final = alias.get(t, t)
            final = redirects.get(final, final)
            page = pages.get(final)
            if page and page.get('pageimage'):
                out[t] = page['pageimage']
        time.sleep(0.5)
    return out


def file_infos(files):
    """file name -> imageinfo dict (only files hosted on Commons)"""
    out = {}
    for batch in chunks(sorted(set(files)), 40):
        data = api('commons.wikimedia.org', {
            'action': 'query', 'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size|mime',
            'iiurlwidth': 960, 'redirects': 1, 'titles': '|'.join('File:' + f for f in batch),
        }).get('query', {})
        alias = {n['to']: n['from'] for n in data.get('normalized', [])}
        for p in data.get('pages', []):
            if p.get('missing') or not p.get('imageinfo'):
                continue
            name = alias.get(p['title'], p['title'])
            out[name.removeprefix('File:').replace(' ', '_')] = p['imageinfo'][0]
            out[name.removeprefix('File:')] = p['imageinfo'][0]
        time.sleep(0.5)
    return out


def save(img_bytes, key):
    im = Image.open(io.BytesIO(img_bytes))
    im.load()
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert('RGB')
    main = im.copy()
    main.thumbnail(MAIN_BOX, Image.LANCZOS)
    main.save(os.path.join(IMG_DIR, f'{key}.jpg'), 'JPEG', quality=72, optimize=True, progressive=True)
    thumb = im.copy()
    thumb.thumbnail(THUMB_BOX, Image.LANCZOS)
    thumb.save(os.path.join(IMG_DIR, f'{key}_t.jpg'), 'JPEG', quality=70, optimize=True)
    return main.size


def main():
    manifest = json.load(open(MANIFEST, encoding='utf-8'))
    os.makedirs(IMG_DIR, exist_ok=True)
    credits = json.load(open(CREDITS, encoding='utf-8')) if os.path.exists(CREDITS) else {}
    wanted = {m['key']: m['title'] for m in manifest}

    # Drop images that are no longer referenced.
    for key in list(credits):
        if key not in wanted:
            credits.pop(key)
    for f in os.listdir(IMG_DIR):
        if f.split('_')[0].split('.')[0] not in wanted:
            os.remove(os.path.join(IMG_DIR, f))

    todo = {k: t for k, t in wanted.items()
            if k not in credits or not os.path.exists(os.path.join(IMG_DIR, f'{k}.jpg'))}
    print(f'{len(wanted)} titles, {len(todo)} to fetch')
    report = []
    leads = lead_images(list(todo.values()))
    infos = file_infos(list(leads.values()))
    for key, title in sorted(todo.items(), key=lambda kv: kv[1]):
        fname = leads.get(title)
        if not fname:
            report.append(f'NO_FREE_LEAD_IMAGE\t{title}')
            continue
        info = infos.get(fname) or infos.get(fname.replace('_', ' '))
        if not info:
            report.append(f'NOT_ON_COMMONS\t{title}\t{fname}')
            continue
        meta = info.get('extmetadata', {})
        lic = clean(meta.get('LicenseShortName', {}).get('value', ''), 40)
        if meta.get('NonFree', {}).get('value') == 'true' or not FREE.search(lic):
            report.append(f'LICENSE_SKIPPED\t{title}\t{fname}\t{lic}')
            continue
        url = info.get('thumburl') or info.get('url')
        r = get(url)
        if r is None or not r.ok:
            report.append(f'DOWNLOAD_FAILED\t{title}\t{url}')
            continue
        try:
            w, h = save(r.content, key)
        except Exception as e:  # noqa: BLE001 - unsupported formats are just skipped
            report.append(f'DECODE_FAILED\t{title}\t{fname}\t{e}')
            continue
        artist = clean(meta.get('Artist', {}).get('value', '')) or clean(meta.get('Credit', {}).get('value', ''))
        credits[key] = {
            't': title,
            'f': fname.replace(' ', '_'),
            'a': artist,
            'l': lic,
            'w': w,
            'h': h,
        }
        print('ok', title)
        time.sleep(0.3)

    credits = dict(sorted(credits.items()))
    with open(CREDITS, 'w', encoding='utf-8') as f:
        json.dump(credits, f, ensure_ascii=False, indent=0)
        f.write('\n')
    with open(REPORT, 'w', encoding='utf-8') as f:
        f.write(f'# {len(credits)}/{len(wanted)} images available\n')
        f.write('\n'.join(sorted(report)) + '\n')
    print(f'{len(credits)}/{len(wanted)} images available; {len(report)} problems')


if __name__ == '__main__':
    sys.exit(main())
