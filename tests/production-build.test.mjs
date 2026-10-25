import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const read = (path) => readFileSync(join(dist, path), 'utf8')

test('production build includes a compiled entry point and hashed assets', () => {
  assert.ok(existsSync(join(dist, 'index.html')), 'Run npm run build before release tests')
  const html = read('index.html')
  assert.match(html, /<html lang="en">/)
  assert.match(html, /<meta name="description"/)
  assert.match(html, /rel="canonical"/)
  assert.doesNotMatch(html, /src="\/src\/main\.jsx"/, 'Development entry point was not compiled')
  const assets = readdirSync(join(dist, 'assets'))
  assert.ok(assets.some((asset) => /^index-[\w-]+\.js$/.test(asset)), 'Missing hashed application JS bundle')
  assert.ok(assets.some((asset) => /^index-[\w-]+\.css$/.test(asset)), 'Missing hashed stylesheet')
})

test('deployment keeps SPA deep links and search discovery files', () => {
  const redirects = read('_redirects')
  assert.match(redirects, /\/\*\s+\/index\.html\s+200/)
  const sitemap = read('sitemap.xml')
  for (const route of [
    '/', '/projects', '/projects/nc-news', '/projects/virtual-exhibition',
    '/projects/my-plants', '/education', '/work-experience', '/contact',
  ]) {
    assert.ok(sitemap.includes('https://ahmadyousufi.dev' + route + '</loc>'), route)
  }
  assert.match(read('robots.txt'), /Sitemap:/i)
})

test('production host headers protect content and cache fingerprinted assets', () => {
  const headers = read('_headers')
  for (const directive of [
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy:',
    'X-Frame-Options: DENY',
    '/assets/*',
    'immutable',
  ]) {
    assert.ok(headers.includes(directive), 'Missing header rule: ' + directive)
  }
  assert.match(headers, /\/index\.html\s*\n\s*Cache-Control:\s*public, max-age=0, must-revalidate/)
})
