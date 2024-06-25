import { defineConfig, devices } from '@playwright/test';
require('dotenv').config({ path: `${__dirname}/env/prod.env` });


export default defineConfig({
    testDir: '../features',
    timeout: 240000,
    expect: {
        timeout: 30000
    },
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { open: 'never' }], ['list'],
        ["allure-playwright",
            {environmentInfo: {
                    NODE_VERSION: process.version,
                    OS: process.platform,
                    ENV: process.env.ENV,
                    WEB_URL: process.env.WEB_URL,
                    POSTMAN_URL: process.env.POSTMAN_URL,
                }}]],
    globalSetup: require.resolve('./testSetup/GlobalSetup'),
    globalTeardown: require.resolve('./testSetup/GlobalTearDown'),

    use: {
        actionTimeout: 0,
        trace: 'on',
        video: 'off',
    },

    projects: [
        {
            name: 'chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'safari',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'mobileChrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'mobileSafari',
            use: { ...devices['iPhone 13'] },
        },
        {
            name: 'worker',
        },
    ],
});
