import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'smoke.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    timezoneId: 'Europe/Berlin',
    ...devices[process.env.MYWIK_TEST_WEBKIT === '1' ? 'iPhone 13' : 'Pixel 7'],
    browserName: process.env.MYWIK_TEST_WEBKIT === '1' ? 'webkit' : 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `${process.platform === 'win32' ? 'python' : 'python3'} -m http.server 4173 --bind 127.0.0.1 --directory dist`,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
