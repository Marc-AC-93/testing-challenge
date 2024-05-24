import {BrowserContext, expect, Locator, Page, test} from "@playwright/test";

export abstract class WebUtils {
    protected constructor(private page: Page, private context: BrowserContext) {
    }

    async getNewTab(element: Locator): Promise<Page> {
        let pagePromise;
        let newPage: Page;

        pagePromise = this.context.waitForEvent('page')
        await element.click()
        newPage = await pagePromise
        await newPage.waitForLoadState()
        return newPage
    }

    async waitForAttributeToChange(element: Locator, attribute: string, newValue: string): Promise<void>{
        await test.step(`When user waits until new ${attribute} is loaded: ${newValue}`,
            async () => {
                await expect(element).toHaveAttribute(attribute, newValue)
            })
    }
}