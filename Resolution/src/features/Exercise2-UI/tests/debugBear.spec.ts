import {test} from "../helpers/webAppFixture";


test.describe("DebugBear web", ()=>{
    const webUrls = ["https://es.idoven.ai"]

    webUrls.forEach( web => {
        test(` Speed web creates the load report for '${web}' web page`, {
                tag: ['@web']}, async ({debugBearPage}) => {
            await debugBearPage.whenUserFillsSearchWebInputWithWeb(web)
            await debugBearPage.whenUserSelectsSearch()
            await debugBearPage.thenUserVerifiesLoadReportIsDisplayed()
        });
    })

    const wrongInputs = ["aksljdlkasjd", "0101000101", "'?!"]

    wrongInputs.forEach( data => {
        test(`Speed web notifies about an error regarding url format '${data}'`, {
            tag: ['@web']}, async ({debugBearPage}) => {
            await debugBearPage.whenUserFillsSearchWebInputWithWeb(data)
            await debugBearPage.whenUserSelectsSearch()
            await debugBearPage.thenUserVerifiesNotificationError()
        });
    })

    test.only(`Speed web generates the load report with failure due the web page does not exist`, {
        tag: ['@web']}, async ({debugBearPage}) => {
        await debugBearPage.whenUserFillsSearchWebInputWithWeb("https://en.idoven.a/")
        await debugBearPage.whenUserSelectsSearch()
        await debugBearPage.thenUserVerifiesLoadReportGeneratedWithNotFoundError()
    });
})