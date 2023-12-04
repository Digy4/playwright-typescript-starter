import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
import digyRunnerConfig from './digy-runner-config-web';
const ENV = process.env.ENV;

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`, `subex`, `demo`].includes(ENV)) {
  console.log(`Please provide a correct environment value like "npx cross-env ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

const config: PlaywrightTestConfig = {

  testDir: './tests/functional',

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //Global Teardown to run after all tests
  globalTeardown: `./global-teardown`,

  //sets timeout for each test case
  timeout: 25000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: [
      [`./CustomReporterConfig.ts`],
      [`html`, { outputFolder: 'html-report', open: 'never' }],
      ['@digy4/digyrunner-playwright/DigyReporter', digyRunnerConfig]
  ],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        headless: true,
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,

        //Picks Base Url based on User input
        baseURL: testConfig[process.env.ENV],

        //Browser height and width
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        // screenshot: 'only-on-failure',
        screenshot: 'on',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        video: 'on',
    },


    projects: [
        {
            name: 'Chrome',
            use: {
                channel: 'chrome',
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },

        /*{
          name: `Chromium`,
          use: {
            browserName: `chromium`,
            baseURL: testConfig[process.env.ENV],
            headless: true,
            viewport: { width: 1500, height: 730 },
            ignoreHTTPSErrors: true,
            acceptDownloads: true,
            screenshot: `only-on-failure`,
            video: `retain-on-failure`,
            trace: `retain-on-failure`,
            launchOptions: {
              slowMo: 0
            }
          },
        },*/

      // {
      //     name: 'firefox',
      //     use: {
      //         ...devices['Desktop Firefox'],
      //     },
      // },

    /*{
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[process.env.ENV],
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `Device`,
      use: {
        ...devices[`Pixel 4a (5G)`],
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig[process.env.ENV],
        headless: true,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `DB`
    },
    {
      name: `API`,
      use: {
        baseURL: testConfig[process.env.ENV]
      }
    }*/
  ],
};
export default config;
