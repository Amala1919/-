#!/usr/bin/env bash
# Rebuilds web/public/hist/ (historical borders for the time-travel globe) from
# aourednik/historical-basemaps (GPL-3.0): https://github.com/aourednik/historical-basemaps
# Requires: curl, python3, node, and `npm i -g mapshaper` (or npx).
set -euo pipefail
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
BASE=https://raw.githubusercontent.com/aourednik/historical-basemaps/master
curl -sSf "$BASE/index.json" -o "$TMP/index.json"
python3 - "$TMP/index.json" > "$TMP/files.txt" <<'PY'
import json, sys
for x in json.load(open(sys.argv[1]))['years']:
    if x['year'] not in (-123000, 1492):
        print(x['year'], x['filename'])
PY
mkdir -p "$TMP/out" web/public/hist
while read -r y f; do
  curl -sSf "$BASE/geojson/$f" -o "$TMP/$f"
  npx -y mapshaper@0.6 "$TMP/$f" -clean -simplify 5% keep-shapes planar -filter-fields NAME,SUBJECTO \
    -o format=topojson quantization=20000 "web/public/hist/$y.json"
done < "$TMP/files.txt"
# Label positions (largest polities per year) -> web/public/hist/index.json
cp scripts/hist-labels.mjs web/_hist-labels.mjs
(cd web && node _hist-labels.mjs public/hist public/hist/index.json /dev/null)
rm web/_hist-labels.mjs
