import {mergeTests, test as base} from '@playwright/test';
import {test as testBaseFixture} from '../../../common/fixtures/testBaseFixture';
import {TestBase} from "../../../common/testBase";
import {DebugBearPage} from "../pages/DebugBearPage";


type MyFixtures = {
    testBase: TestBase;
    debugBearPage: DebugBearPage
};

export const test = mergeTests(testBaseFixture, base.extend<MyFixtures>({
    debugBearPage: async ({ testBase }, use ) => {
        const debugBearPage = new DebugBearPage(testBase);
        await debugBearPage.givenNavigatesToDebugBearPage();
        await use(debugBearPage);
    },
}));