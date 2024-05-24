export type formattedResponse = {
    statusCode: number,
    responseText: any
}

export enum statusCode {
    OK= 200,
    CREATED= 201,
    DELETED=204,
    BAD_REQUEST= 400,
    INVALID_REQUEST= 403,
    NOT_FOUND= 404,
    SERVER_ERROR= 500
}