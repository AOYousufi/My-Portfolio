import { test, expect } from '@playwright/test'

test('unknown routes are excluded from indexing and recover on navigation', async ({ page }) => {
  await page.goto('/projects/not-a-real-project')
  await expect(page.getByRole('heading', { level: 1, name: "This page isn't here." })).toBeVisible()
  await expect(page).toHaveTitle('Page Not Found | Ahmad Ozair Yousufi')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('meta[name="twitter:url"]'))
    .toHaveAttribute('content', 'https://ahmadyousufi.dev/projects/not-a-real-project')

  await page.getByRole('link', { name: 'Back home' }).click()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('meta[name="twitter:url"]'))
    .toHaveAttribute('content', 'https://ahmadyousufi.dev/')
})

test('social preview metadata follows route changes', async ({ page }) => {
  await page.goto('/projects/nc-news')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  await expect(page.locator('meta[name="twitter:title"]'))
    .toHaveAttribute('content', 'NC News | Ahmad Ozair Yousufi')
  await expect(page.locator('meta[name="twitter:description"]'))
    .toHaveAttribute('content', /full-stack news and discussion platform/)
  await expect(page.locator('meta[name="twitter:url"]'))
    .toHaveAttribute('content', 'https://ahmadyousufi.dev/projects/nc-news')

  await page.getByRole('link', { name: 'All projects' }).click()
  await expect(page.locator('meta[name="twitter:title"]'))
    .toHaveAttribute('content', 'Projects | Ahmad Ozair Yousufi')
  await expect(page.locator('meta[name="twitter:url"]'))
    .toHaveAttribute('content', 'https://ahmadyousufi.dev/projects')
})
