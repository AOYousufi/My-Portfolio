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
  await trigger.click()
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
