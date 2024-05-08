import {
  devices,
  PlaywrightTestConfig,
  ReporterDescription,
 } from '@playwright/test';
 import * as dotenv from 'dotenv';
 import { getMilliseconds } from 'utils/helper';
 
 
 dotenv.config();
 
 const reporter: ReporterDescription[] =
  process.env.CI === 'true'
    ? [
      ['blob']
        // ['github'],
        // ['json', { outputFile: 'test-results/test-results.json' }],
        // ['junit', { outputFile: 'test-results/junit-test-results.xml' }],
        // ['html', { outputFolder: 'test-results/', open: 'never' }],
        // ['list'],
      ]
    : [
        [
          'html',
          { outputFolder: 'test-results/test-report/', open: 'on-failure' },
        ],
        ['list'],
      ];
 /**
 * See https://playwright.dev/docs/test-configuration.
 */
 
 
 const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout:  getMilliseconds(1, 'minutes'),
  /* Maximum runtime of an entire test suite. */
  globalTimeout: getMilliseconds(20, 'minutes'),
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: getMilliseconds(30, 'seconds'),
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Different number of retries in CI. */
  retries: 1,
  /* Number of workers defaults to 1 and may be increased via the CLI, but test
     stability may be impacted depending on the test execution infrastructure. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter,
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/test-artifacts',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: getMilliseconds(60, 'seconds'),
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL:'https://premiumbeat.com',
    navigationTimeout: getMilliseconds(60, 'seconds'),
    ignoreHTTPSErrors: true,
    /* Artifacts are only kept during failures (and are retained even after a successful retry) */
    trace: 'on',
    video: 'retain-on-failure',
    screenshot: {
      mode: 'on',
      fullPage: true,
    },
  },
 
  projects: [
    /* Configure projects for major browsers */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          ignoreDefaultArgs: ['--disable-extensions'],
          args: [
            '--mute-audio',
          ],
        },
      },
    },
  ],
 };
  
 export default config;
