import { test, expect } from '@playwright/test';

test('homepage has title and displays items', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check if the title contains "PassByMap"
  await expect(page).toHaveTitle(/PassByMap/);

  // Get the count of list items
  const listItems = await page.locator('li');
  const itemCount = await listItems.count();

  // Assert that there are more than 0 items
  expect(itemCount).toBeGreaterThan(0);
});

