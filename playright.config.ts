import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory for test files
  timeout: 30 * 1000, // Maximum time one test can run
  retries: 1, // Retry failed tests once
  use: {
    baseURL: 'http://localhost:5173', // Base URL for your app (Vite dev server)
    headless: true, // Run tests in headless mode by default
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry', // Record videos on first retry only
    screenshot: 'only-on-failure', // Capture screenshots on failure
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
