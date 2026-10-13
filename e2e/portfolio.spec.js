import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('visitor can open a featured project case study', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: /Ahmad Ozair/ })).toBeVisible()
  await page.getByRole('link', { name: 'View Projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible()

  await page.getByRole('link', { name: 'Read NC News case study' }).click()
  await expect(page).toHaveURL(/\/projects\/nc-news$/)
  await expect(page.getByRole('heading', { level: 1, name: 'NC News' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Backend source/ })).toHaveAttribute(
    'href', 'https://github.com/AOYousufi/NC-News-BE'
  )
})

test('every case study works directly and invalid paths show 404', async ({ page }) => {
  await page.goto('/projects/my-plants')
  await expect(page.getByRole('heading', { level: 1, name: 'My Plants' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Mobile source/ })).toHaveAttribute(
    'href', 'https://github.com/AOYousufi/my-plants-FE'
  )

  await page.goto('/not-a-real-route')
  await expect(page.getByRole('heading', { level: 1, name: /page isn't here/i })).toBeVisible()
  await page.getByRole('link', { name: 'Back home' }).click()
  await expect(page).toHaveURL('/')
})

test('email form retains required validation and explains mailto', async ({ page }) => {
  await page.goto('/contact')
  const name = page.getByLabel('Name', { exact: true })
  const email = page.getByLabel('Email', { exact: true })
  const message = page.getByLabel('Message', { exact: true })
  await expect(name).toHaveAttribute('required', '')
  await expect(email).toHaveAttribute('type', 'email')
  await expect(message).toHaveAttribute('required', '')
  await expect(page.getByText(/press Send there to deliver your message/)).toBeVisible()
  await name.fill('Portfolio Visitor')
  await email.fill('invalid-address')
  await message.fill('I would like to discuss a placement opportunity.')
  expect(await email.evaluate((input) => input.checkValidity())).toBe(false)
})

test('mobile menu works without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true')
  await page.locator('#primary-navigation').getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false')
  const width = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }))
  const overflowElements = await page.evaluate(() => {
    const viewport = window.innerWidth
    return [...document.querySelectorAll('body *')]
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width && rect.right > viewport + 2)
      .slice(0, 12)
      .map(({ element, rect }) => ({
        element: element.tagName.toLowerCase(),
        className: typeof element.className === 'string' ? element.className.slice(0, 100) : '',
        right: Math.round(rect.right),
        left: Math.round(rect.left),
      }))
  })
  const ancestors = await page.evaluate(() =>
    ['html', 'body', '.app-wrapper', '.main-content', '.projects-section', '.projects-grid', '.project-card']
      .map((selector) => {
        const element = document.querySelector(selector)
        const rect = element?.getBoundingClientRect()
        const style = element ? getComputedStyle(element) : null
        return { selector, x: rect?.x, width: rect?.width, right: rect?.right,
          transform: style?.transform, padding: style?.padding, grid: style?.gridTemplateColumns }
      })
  )
  expect(width.page, JSON.stringify({ overflowElements, ancestors }, null, 2)).toBeLessThanOrEqual(width.viewport + 2)
})

test('light theme persists between routes and refreshes', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.goto('/education')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

for (const route of ['/', '/projects', '/education', '/contact']) {
  test(`serious accessibility issues: ${route}`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const serious = results.violations.filter((item) =>
      item.impact === 'serious' || item.impact === 'critical'
    )
    expect(serious, JSON.stringify(serious.map((item) => ({
      id: item.id,
      impact: item.impact,
      targets: item.nodes.map((node) => node.target),
    })), null, 2)).toEqual([])
  })
}
