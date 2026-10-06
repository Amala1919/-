// Bundles the web app into android/app/src/main/assets/www (also used for browser preview).
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../android/app/src/main/assets/www');
const serve = process.argv.includes('--serve');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(resolve(here, 'public'), out, { recursive: true });

const options = {
  entryPoints: { app: resolve(here, 'src/main.js') },
  bundle: true,
  minify: !serve,
  sourcemap: serve ? 'inline' : false,
  format: 'iife',
  target: ['es2019', 'chrome80'],
  outdir: out,
  loader: { '.json': 'json' },
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'info',
};

if (serve) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: out, port: 8123 });
  console.log(`Preview: http://localhost:${port}/index.html`);
} else {
  await esbuild.build(options);
}
