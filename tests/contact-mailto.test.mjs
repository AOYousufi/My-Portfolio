import test from 'node:test'
import assert from 'node:assert/strict'
import { CONTACT_EMAIL, buildContactMailto } from '../src/utils/contactEmail.js'

test('contact drafts trim fields and encode special characters safely', () => {
  const href = buildContactMailto({
    name: '  Jane & José  ',
    email: '  jane+jobs@example.com  ',
    message: '  I would like React & Node help?\nA second line ✓  ',
  })

  const draft = new URL(href)
  assert.equal(draft.protocol, 'mailto:')
  assert.equal(draft.pathname, CONTACT_EMAIL)
  assert.equal(draft.searchParams.get('subject'), 'Portfolio enquiry from Jane & José')
  assert.equal(
    draft.searchParams.get('body'),
    'Hi Ahmad,\n\nI would like React & Node help?\nA second line ✓\n\nBest regards,\nJane & José\njane+jobs@example.com'
  )
  assert.equal([...draft.searchParams.keys()].join(','), 'subject,body')
})

test('contact drafts preserve Unicode and do not treat punctuation as extra parameters', () => {
  const href = buildContactMailto({
    name: '🙂 Test',
    email: 'someone@example.com',
    message: 'Hello: 50% done & ready #1',
  })

  const draft = new URL(href)
  assert.equal(draft.searchParams.size, 2)
  assert.match(draft.searchParams.get('subject'), /🙂 Test/)
  assert.match(draft.searchParams.get('body'), /50% done & ready #1/)
  assert.match(href, /%26/)
  assert.match(href, /%23/)
})
