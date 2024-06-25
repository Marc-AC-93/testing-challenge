import {APIRequestContext, expect, test} from "@playwright/test";
import {ApiUtil} from "../../../common/utils/ApiUtil";
import {formattedResponse} from "../../../common/types/apiTypes";
import {BookData} from "../helpers/BookData";

type bookStoreJson = {
    title: string,
    author: string,
    published_date: string,
    isbn: string,
    price: string
}

export class BookStoreApi extends ApiUtil {
    private book_id = ""

    constructor(private request: APIRequestContext,
                private basePath: string ) {
        super(request)
    }

    public getBookStoreJson(bookData: BookData): bookStoreJson{
        return {
            "title": bookData.title,
            "author": bookData.author,
            "published_date": bookData.published_date,
            "isbn": bookData.isbn,
            "price": bookData.price
        }
    }

    public async whenRequestPostCreateNewBook(body: bookStoreJson|any): Promise<formattedResponse>{
        return await test.step(`When POST request is launched to create a new book`, async ():Promise<formattedResponse> => {
            let response = await this.post(`${this.basePath}/books`, {}, body)
            this.book_id = response.responseText.book_id
            return response
        })
    }

    public async whenRequestGetAllBooks(): Promise<formattedResponse>{
        return await test.step(`When GET request is launched to get all books data`, async ():Promise<formattedResponse> => {
            return await this.get(`${this.basePath}/books`, {})
        })
    }

    public async whenRequestGetBook(book_id: string = this.book_id): Promise<formattedResponse>{
        return await test.step(`When GET request is launched to get book: ${book_id}`, async ():Promise<formattedResponse> => {
            return await this.get(`${this.basePath}/books/${book_id}`, {})
        })
    }

    public async whenRequestPutToUpdateBook(body: bookStoreJson|any, book_id: string = this.book_id): Promise<formattedResponse>{
        return await test.step(`When PUT request is launched to update the book: ${book_id}`, async ():Promise<formattedResponse> => {
            return await this.put(`${this.basePath}/books/${book_id}`, {}, body)
        })
    }

    public async whenRequestDeleteBook(book_id: string = this.book_id): Promise<formattedResponse>{
        return await test.step(`When Delete request is launched to remove the specific book: ${book_id}`, async ():Promise<formattedResponse> => {
            return await this.delete(`${this.basePath}/books/${book_id}`, {})
        })
    }
}