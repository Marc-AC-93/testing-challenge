import {mergeTests, test as base} from '@playwright/test';
import {test as testBaseFixture} from '../../../common/fixtures/testBaseFixture';
import {TestBase} from "../../../common/testBase";
import {BookStoreApi} from "../steps/bookStoreApi";
import {Verifications} from "../../../common/steps/Verifications";
import {BookData} from "./BookData";
import {RandomData} from "../../../common/utils/RandomData";


type MyFixtures = {
    testBase: TestBase;
    bookStoreApi: BookStoreApi;
    bookData: BookData;
    verifications: Verifications;
};

export const test = mergeTests(testBaseFixture, base.extend<MyFixtures>({
    bookStoreApi: async ({ testBase }, use ) => {
        const postmanApi = new BookStoreApi(testBase.request, testBase.BOOKS_API);
        await use(postmanApi);
    },
    verifications: async ({  }, use ) => {
        const verifications = new Verifications();
        await use(verifications);
    },
    bookData: async ({  }, use ) => {
        const randomData = new RandomData()
        const bookData = new BookData(
            randomData.randomTitle(),
            randomData.randomName(),
            randomData.randomDate(),
            randomData.randomNumber(),
            randomData.randomPrice());
        await use(bookData);
    },
}));