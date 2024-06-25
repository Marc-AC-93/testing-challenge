import { test } from "../helpers/bookStoreFixtures"
import {statusCode, formattedResponse} from "../../../common/types/apiTypes";
import {RandomData} from "../../../common/utils/RandomData";

test.describe( "Book Store API: CRUD", ()=>{
    test('Create - Verify the post request to create a new book', {
        tag: ['@api', '@crud', '@post']}, async ({ bookStoreApi, bookData, verifications }) => {

        let body = bookStoreApi.getBookStoreJson(bookData)
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(body)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.CREATED)
        await verifications.thenResponseTextToContainsArrayOfStrings(response,
            [bookData.author, bookData.title, bookData.price, bookData.isbn, bookData.published_date])
        });

    test('Read - Verify the get request to read the book data', {
        tag: ['@api', '@crud', '@get']}, async ({ bookStoreApi, bookData, verifications }) => {

        let body = bookStoreApi.getBookStoreJson(bookData)
        let response = await bookStoreApi.whenRequestPostCreateNewBook(body)
        let createdBook = response.responseText

        response = await bookStoreApi.whenRequestGetAllBooks();
        await verifications.thenStatusCodeToBeEqual(response, statusCode.OK)
        await verifications.thenResponseTextToContain(response, createdBook)

        response = await bookStoreApi.whenRequestGetBook();
        await verifications.thenStatusCodeToBeEqual(response, statusCode.OK)
        await verifications.thenResponseTextToBeEqual(response, createdBook)
    });

    test('Update - Put new book data', {
        tag: ['@api', '@crud', '@put']}, async ({ bookStoreApi, bookData, verifications }) => {

        let body = bookStoreApi.getBookStoreJson(bookData)
        await bookStoreApi.whenRequestPostCreateNewBook(body)

        bookData.title="New book"
        bookData.author="QA"
        bookData.price="200.00"
        bookData.published_date="2000-12-31"
        bookData.isbn="123456789"
        bookData.price="123.45"
        body= bookStoreApi.getBookStoreJson(bookData)

        let response = await bookStoreApi.whenRequestPutToUpdateBook(body)
        let updatedBook = response.responseText

        await verifications.thenStatusCodeToBeEqual(response, statusCode.OK)
        await verifications.thenResponseTextToContainsArrayOfStrings(response,
            [bookData.author, bookData.title, bookData.price, bookData.isbn, bookData.published_date])


        response = await bookStoreApi.whenRequestGetBook();
        await verifications.thenStatusCodeToBeEqual(response, statusCode.OK)
        await verifications.thenResponseTextToBeEqual(response, updatedBook)
    });

    test('Delete - Delete new book', {
        tag: ['@api', '@crud', '@delete']}, async ({ bookStoreApi, bookData, verifications }) => {

        let body = bookStoreApi.getBookStoreJson(bookData)
        await bookStoreApi.whenRequestPostCreateNewBook(body)

        let response = await bookStoreApi.whenRequestDeleteBook()
        await verifications.thenStatusCodeToBeEqual(response, statusCode.DELETED)
        await verifications.thenResponseTextToBeEqual(response, "")
    });
});

test.describe( "Book Store API: Error conditions", ()=>{
    const postErrorDescription = {"error": "Missing required fields"}
    const getErrorDescription = {'error': 'Book not found'}
    const postFieldTooLarge = {"error": "Field too large"}
    const wrongBookId = "123abc"

    test('EC - Verify error for post request without title', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, verifications }) => {

        let bookData = {
            author: "author",
            published_date: "2000-01-01",
            isbn: "123456789",
            price: "100.00"
        }
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postErrorDescription)
    });

    test('EC - Verify error for post request without author', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, verifications }) => {

        let bookData = {
            title: "title",
            published_date: "2000-01-01",
            isbn: "123456789",
            price: "100.00"
        }
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postErrorDescription)
    });

    test('EC - Verify error for post request without published date', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, verifications }) => {

        let bookData = {
            title: "title",
            author: "author",
            isbn: "123456789",
            price: "100.00"
        }
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postErrorDescription)
    });

    test('EC - Verify error for post request without isbn', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, verifications }) => {

        let bookData = {
            title: "title",
            author: "author",
            published_date: "2000-01-01",
            price: "100.00"
        }
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postErrorDescription)
    });

    test('EC - Verify error for post request without price', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, verifications }) => {

        let bookData = {
            title: "title",
            author: "author",
            published_date: "2000-01-01",
            isbn: "123456789"
        }
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postErrorDescription)
    });

    test('EC - Verify error for get request with wrong book_id', {
        tag: ['@api', '@ec', '@get']}, async ({ bookStoreApi, bookData, verifications }) => {

        await bookStoreApi.whenRequestPostCreateNewBook(bookData)
        let response = await bookStoreApi.whenRequestGetBook(wrongBookId)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.NOT_FOUND)
        await verifications.thenResponseTextToBeEqual(response, getErrorDescription)
    });

    test('EC - Verify error for put request with wrong book_id', {
        tag: ['@api', '@ec', '@put']}, async ({ bookStoreApi, bookData, verifications }) => {

        await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        bookData.title="New book"
        bookData.author="QA"
        bookData.price="200.00"
        let response = await bookStoreApi.whenRequestPutToUpdateBook(bookData, wrongBookId)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.NOT_FOUND)
        await verifications.thenResponseTextToBeEqual(response, getErrorDescription)
    });

    test('EC - Verify error for delete request with wrong book_id', {
        tag: ['@api', '@ec', '@delete']}, async ({ bookStoreApi, bookData, verifications }) => {

        await bookStoreApi.whenRequestPostCreateNewBook(bookData)
        let response = await bookStoreApi.whenRequestDeleteBook(wrongBookId)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.NOT_FOUND)
        await verifications.thenResponseTextToBeEqual(response, getErrorDescription)
    });

    test('EC - Verify error for post request with long string in title', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, bookData, verifications }) => {

        const randomTxt = new RandomData()
        bookData.title = randomTxt.randomLongText()
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postFieldTooLarge)
    });

    test('EC - Verify error for post request with long string in author', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, bookData, verifications }) => {

        const randomTxt = new RandomData()
        bookData.title = randomTxt.randomLongText()
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postFieldTooLarge)
    });

    test('EC - Verify error for put request with long string in title', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, bookData, verifications }) => {

        const randomTxt = new RandomData()
        await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        bookData.title = randomTxt.randomLongText()
        let response = await bookStoreApi.whenRequestPutToUpdateBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postFieldTooLarge)
    });

    test('EC - Verify error for put request with long string in author', {
        tag: ['@api', '@ec', '@post']}, async ({ bookStoreApi, bookData, verifications }) => {

        const randomTxt = new RandomData()
        await bookStoreApi.whenRequestPostCreateNewBook(bookData)

        bookData.author = randomTxt.randomLongText()
        let response = await bookStoreApi.whenRequestPutToUpdateBook(bookData)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.BAD_REQUEST)
        await verifications.thenResponseTextToBeEqual(response, postFieldTooLarge)
    });
});

test.describe( "Book Store API: Data driven", ()=>{
    const testData = [
        { title: "title 1", author: "author1", published_date: "2000-01-01", isbn: "123456789", price: "101.00"},
        { title: "title 2", author: "author2", published_date: "2000-01-01", isbn: "-123456789", price: "-102.00"},
        { title: "title 3", author: "author3", published_date: "2000-01-01", isbn: "0", price: "0.00"},
        { title: "title 4", author: "author4", published_date: "2000-01-01", isbn: "10000000000000", price: "1000000000.00"}
    ]

    testData.forEach( dataSet => {
    test(`E2E - Create, read, update and delete a book with title '${dataSet.title}', author '${dataSet.author}, isbn '${dataSet.isbn}' and price '${dataSet.price}'`, {
        tag: ['@api', '@e2e']}, async ({ bookStoreApi, bookData, verifications }) => {

        let body = bookStoreApi.getBookStoreJson(bookData)
        let response: formattedResponse = await bookStoreApi.whenRequestPostCreateNewBook(body)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.CREATED)
        await verifications.thenResponseTextToContainsArrayOfStrings(response,
            [bookData.author, bookData.title, bookData.price, bookData.isbn, bookData.published_date])
        let createdBook = response.responseText

        response = await bookStoreApi.whenRequestGetBook();
        await verifications.thenStatusCodeToBeEqual(response, statusCode.OK)
        await verifications.thenResponseTextToBeEqual(response, createdBook)

        bookData.title="New book"
        bookData.author="QA"
        bookData.price="200.00"
        bookData.published_date="2000-12-31"
        bookData.isbn="123456789"
        bookData.price="123.45"
        body= bookStoreApi.getBookStoreJson(bookData)

        response = await bookStoreApi.whenRequestPutToUpdateBook(body)

        await verifications.thenStatusCodeToBeEqual(response, statusCode.OK)
        await verifications.thenResponseTextToContainsArrayOfStrings(response,
            [bookData.author, bookData.title, bookData.price, bookData.isbn, bookData.published_date])

        response = await bookStoreApi.whenRequestDeleteBook()
        await verifications.thenStatusCodeToBeEqual(response, statusCode.DELETED)
        await verifications.thenResponseTextToBeEqual(response, "")
        });
    })
});
