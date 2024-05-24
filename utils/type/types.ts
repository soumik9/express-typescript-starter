export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IErrorMessage = {
    path: string | number;
    message: string;
};

export type IErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IErrorMessage[];
};

export interface IApiReponse<T> {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: {
        page?: number;
        limit?: number;
        showingTotal?: number;
        total: number;
    };
    data?: T | null;
};

export interface IKeyValueObject {
    [key: string]: string | undefined;
};