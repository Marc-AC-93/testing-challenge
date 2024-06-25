import {expect, test, TestBase} from "../../../common/testBase";
import {th} from "@faker-js/faker";

export class DebugBearPage {
    constructor(
        private testBase: TestBase,
        private page = testBase.page,
        private searchInput = page.locator("//*[@name='url']"),
        private submitSearch = page.locator("//*[@type='submit']"),
        private waitPage = page.locator("//div[@class='mt-2']"),
        private modalContent = page.locator("div.modal__content"),
        private dismissModalContent = page.locator("//*[@data-test-popup-dismiss]"),
        private loadContentReport = page.locator("div.page-load__main-content-container"),
        private errorNotification = page.locator("div.dbb-notification-notice"),
        private loadReportFailure = page.locator("//div[@data-test-failure-detail]")
    ) {
    }
    async givenNavigatesToDebugBearPage(){
        await test.step(`Given navigates to debug bear page`, async () => {
            await this.page.goto(this.testBase.SPEED_WEB)
            await this.page.waitForLoadState()
        })
    }

    async whenUserFillsSearchWebInputWithWeb(web: string= this.testBase.IDOVEN_WEB){
        await test.step(`When user fills the search page with '${web}' url`, async () => {
            await this.searchInput.fill(web)
            await this.page.waitForLoadState()
        })
    }

    async whenUserSelectsSearch(){
        await test.step(`When user selects search`, async () => {
            await this.submitSearch.click()
        })
    }

    private async waitForLoadReport(){
        await expect(this.waitPage).toBeVisible()
        await this.waitPage.waitFor({state: "hidden", timeout: this.testBase.LONG_ACTION_TIMEOUT})

        const isModalActive = await this.modalContent.isVisible({timeout: this.testBase.SHORT_ACTION_TIMEOUT})
        if (isModalActive){
            await this.dismissModalContent.click();
        }
        await expect(this.loadContentReport).toBeVisible()
    }

    async thenUserVerifiesLoadReportIsDisplayed(){
        await test.step(`Then user verifies the result is generated`, async () => {
            await this.waitForLoadReport()
            await expect(this.loadReportFailure).not.toBeVisible()
        })
    }

    async thenUserVerifiesLoadReportGeneratedWithNotFoundError(){
        await test.step(`Then user verifies the load report is generated with page not found error`, async () => {
            await this.waitForLoadReport()
            await expect(this.loadReportFailure).toBeVisible()
        })
    }

    async thenUserVerifiesNotificationError(){
        await test.step(`Then user verifies that notification error is created`, async () => {
            await expect(this.errorNotification).toBeVisible()
        })
    }
}