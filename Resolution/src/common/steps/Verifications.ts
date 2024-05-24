import {expect, test} from "@playwright/test";
import {formattedResponse} from "../types/apiTypes";

export class Verifications {
    constructor() {
    }

    public async thenStatusCodeToBeEqual(response:formattedResponse, expectedStatusCode: number): Promise<void>{
        await test.step(`Then asserts the status code received (${response.statusCode}) is equal than expected (${expectedStatusCode})`, async () => {
            expect(response.statusCode).toBe(expectedStatusCode)
        })
    }
    public async thenResponseTextToContainsArrayOfStrings(response:formattedResponse, arrayStrings: string[]): Promise<void>{
        await test.step(`Then asserts the expected strings are included in the response`, async () => {
            for(var index in arrayStrings)
            {
                expect(JSON.stringify(response.responseText)).toContain(arrayStrings[index])
            }
        })
    }

    public async thenResponseTextToContain(response:formattedResponse, expectedResponseText: any): Promise<void>{
        await test.step(`Then asserts the expected text is contained in the current response`, async () => {
            expect(response.responseText).toContainEqual(expectedResponseText)
        })
    }

    public async thenResponseTextToBeEqual(response:formattedResponse, expectedResponseText: any): Promise<void>{
        await test.step(`Then asserts the expected text is the same than response text`, async () => {
            expect(response.responseText).toEqual(expectedResponseText)
        })
    }
}