import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('skip navigation is first in keyboard order and reaches main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('Escape closes the mobile menu and returns focus to its toggle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const openButton = page.getByRole('button', { name: 'Open navigation menu' })
  await openButton.click()
  await expect(page.getByRole('button', { name: 'Close navigation menu' }))
    .toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Escape')
  await expect(openButton).toHaveAttribute('aria-expanded', 'false')
  await expect(openButton).toBeFocused()

  await openButton.click()
  await page.locator('#primary-navigation').getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.locator('#main-content')).toBeFocused()
})

test('terminal permits Tab navigation and restores focus after Escape', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Open interactive terminal Easter egg' })
  await trigger.focus()
  await page.keyboard.press('Enter')
  const terminal = page.getByRole('dialog', { name: 'Interactive developer terminal' })
  await expect(terminal).toBeVisible()
  const input = page.getByRole('textbox', { name: 'Type a terminal command' })
  await expect(input).toBeFocused()

  await input.fill('he')
  await page.keyboard.press('Control+Space')
  await expect(input).toHaveValue('help')
  await page.keyboard.press('Tab')
  await expect(input).not.toBeFocused()

  await page.keyboard.press('Escape')
  await expect(terminal).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('terminal output is announced as a live log and clears correctly', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open interactive terminal Easter egg' }).click()

  const output = page.getByRole('log', { name: 'Terminal output' })
  const input = page.getByRole('textbox', { name: 'Type a terminal command' })
  await expect(output).toHaveAttribute('aria-live', 'polite')
  await expect(output).toHaveAttribute('aria-relevant', 'additions')
  await expect(output).toBeEmpty()

  await input.fill('ping')
  await input.press('Enter')
  await expect(output).toContainText('PONG!')

  await input.fill('clear')
  await input.press('Enter')
  await expect(output).toBeEmpty()
})

test('project details and work history meet serious WCAG A/AA checks', async ({ page }) => {
  for (const route of ['/projects/nc-news', '/work-experience']) {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const failures = results.violations.filter((item) =>
      item.impact === 'serious' || item.impact === 'critical'
    )
    expect(failures, JSON.stringify({
      route,
      failures: failures.map((item) => ({
        rule: item.id,
        impact: item.impact,
        targets: item.nodes.map((node) => node.target),
      })),
    }, null, 2)).toEqual([])
  }
})

test('case study page updates title and canonical metadata', async ({ page }) => {
  await page.goto('/projects/nc-news')
  await expect(page).toHaveTitle('NC News | Ahmad Ozair Yousufi')
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://ahmadyousufi.dev/projects/nc-news')
  await page.getByRole('link', { name: 'All projects' }).click()
  await expect(page).toHaveTitle('Projects | Ahmad Ozair Yousufi')
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://ahmadyousufi.dev/projects')
})

test('navigation highlights only the current route or its children', async ({ page }) => {
  await page.goto('/projects/nc-news')
  const projectsLink = page.locator('#primary-navigation').getByRole('link', { name: 'Projects' })
  await expect(projectsLink).toHaveAttribute('aria-current', 'page')

  await page.goto('/projects-archive')
  await expect(projectsLink).not.toHaveAttribute('aria-current', 'page')
})

test('back-to-top respects the reduced motion setting', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => {
    window.__scrollOptions = []
    window.scrollTo = (options) => { window.__scrollOptions.push(options) }
  })

  const backToTop = page.getByRole('button', { name: 'Scroll back to top' })
  await backToTop.click()
  expect(await page.evaluate(() => window.__scrollOptions.at(-1)?.behavior)).toBe('auto')

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await backToTop.click()
  expect(await page.evaluate(() => window.__scrollOptions.at(-1)?.behavior)).toBe('smooth')
})

test('trailing slash URLs retain canonical SEO metadata and missing pages are noindexed', async ({ page }) => {
  await page.goto('/projects/nc-news/')
  await expect(page).toHaveTitle('NC News | Ahmad Ozair Yousufi')
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', 'https://ahmadyousufi.dev/projects/nc-news')
  await expect(page.locator('meta[name="robots"]'))
    .toHaveAttribute('content', 'index, follow')

  await page.goto('/a-page-that-does-not-exist/')
  await expect(page.getByRole('heading', { level: 1, name: /page isn't here/i })).toBeVisible()
  await expect(page.locator('meta[name="robots"]'))
    .toHaveAttribute('content', 'noindex, follow')

  await page.getByRole('link', { name: 'Back home' }).click()
  await expect(page.locator('meta[name="robots"]'))
    .toHaveAttribute('content', 'index, follow')
})
