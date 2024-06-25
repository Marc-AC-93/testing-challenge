import {APIRequestContext, APIResponse} from "@playwright/test";
import {formattedResponse} from "../types/apiTypes";

export enum BodyType {
    data= "data",
    form= "form"
}

export abstract class ApiUtil {
    protected constructor(private requestContext: APIRequestContext) {}

    private async parseResponse(response: APIResponse): Promise<formattedResponse>{
        try{
            return {statusCode: response.status(), responseText: JSON.parse(await response.text())}
        }
        catch (e){
            return { statusCode: response.status(), responseText: ""}
        }
    }

    protected async post(path: string, headers: {}, body: {}, bodyType: BodyType= BodyType.data): Promise<formattedResponse>{
        let response: APIResponse
        if (bodyType == BodyType.data) {
            response = await this.requestContext.post(path, {headers: headers, data: body})
            return await this.parseResponse(response);
        } else {
            response = await this.requestContext.post(path, {headers: headers, form: body})
            return await this.parseResponse(response);
        }
    }

    protected async put(path: string, headers: {}, body: {}, bodyType: BodyType= BodyType.data): Promise<formattedResponse>{
        let response: APIResponse
        if (bodyType == BodyType.data) {
            response = await this.requestContext.put(path, {headers: headers, data: body})
            return await this.parseResponse(response);
        } else {
            response = await this.requestContext.put(path, {headers: headers, form: body})
            return await this.parseResponse(response);
        }
    }

    protected async get(path: string, headers: {}): Promise<formattedResponse>{
        let response: APIResponse
        response = await this.requestContext.get(path, {headers: headers})
        return await this.parseResponse(response);
    }

    protected async delete(path: string, headers: {}): Promise<formattedResponse>{
        let response: APIResponse
        response = await this.requestContext.delete(path, {headers: headers})
        return await this.parseResponse(response);
    }
}
