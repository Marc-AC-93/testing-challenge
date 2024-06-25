import {test, Page, Locator, BrowserContext, expect, APIRequestContext, TestInfo} from '@playwright/test';
import {GlobalConfig} from "./testConfig/GlobalConfig";


export class TestBase extends GlobalConfig{
    constructor(
        readonly page: Page,
        readonly context: BrowserContext,
        readonly request: APIRequestContext,
        readonly workerInfo: TestInfo,
        )
    {
        super()
    }
}

export { test, Page, Locator, BrowserContext, expect, APIRequestContext } from '@playwright/test';