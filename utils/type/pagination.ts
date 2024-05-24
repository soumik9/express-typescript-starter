import { SortOrder } from "mongoose";

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
};

export interface IPaginationOptionsResult {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: SortOrder;
};