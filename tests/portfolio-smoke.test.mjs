import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PROJECTS, findProjectById } from '../src/data/projects.js'

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8')

test('every featured project has a unique, reachable case-study route', () => {
  const ids = PROJECTS.map((project) => project.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.equal(PROJECTS.length, 3)
  for (const project of PROJECTS) {
    assert.equal(project.path, `/projects/${project.id}`)
    assert.equal(findProjectById(project.id), project)
    assert.ok(project.title && project.description && project.overview)
    assert.ok(project.highlights.length >= 2)
    assert.ok(project.stack.length >= 3)
    assert.ok(project.repositories.length >= 1)
    for (const link of [...project.repositories.map((repo) => repo.url), ...(project.live ? [project.live] : [])]) {
      assert.equal(new URL(link).protocol, 'https:')
    }
  }
})

test('router has public pages, detail pages and a 404 fallback', () => {
  const app = read('../src/App.jsx')
  for (const path of ['/', '/projects', '/education', '/work-experience', '/contact']) {
    assert.ok(app.includes(`path="${path}"`), `Missing route: ${path}`)
  }
  assert.match(app, /path="\/projects\/:projectId"/)
  assert.match(app, /path="\*"/)
  assert.match(app, /className="skip-link"/)
  assert.doesNotMatch(app, /<LoadingScreen\b/)
})

test('search sitemap includes every project and primary page', () => {
  const sitemap = read('../public/sitemap.xml')
  for (const project of PROJECTS) {
    assert.ok(sitemap.includes(`https://ahmadyousufi.dev${project.path}</loc>`))
  }
  for (const path of ['/', '/projects', '/education', '/work-experience', '/contact']) {
    assert.ok(sitemap.includes(`https://ahmadyousufi.dev${path}</loc>`))
  }
  assert.ok(read('../public/_redirects').includes('/index.html'))
})

test('contact is explicitly email-client based and retains HTML validation', () => {
  const contact = read('../src/pages/Contact.jsx')
  assert.match(contact, /mailto:/)
  assert.match(contact, /type="email"/)
  assert.match(contact, /required/)
  assert.doesNotMatch(contact, /noValidate/)
})
