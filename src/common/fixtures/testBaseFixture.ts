import {test as base} from '@playwright/test';
import {TestBase} from "../testBase";


type MyFixtures = {
    testBase: TestBase
};

export const test = base.extend<MyFixtures>({
    testBase: async ({ page, context, request }, use, worker ) => {
        const testBase = new TestBase(page, context, request, worker);
        test.info().annotations.push({type: 'Environment', description: testBase.ENV});
        await use(testBase);
    }
});