import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { ENUM_CATEGORY_FEATURE } from "../../utils/enums/featureOrderEnum";
import { catchAsync, sendResponse } from "../../utils/helpers/global";
import { Category, FeatureOrder, SubCategory } from "../models";

// get all Category with subcategories
const GetCategoryWithSubCategories: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // these queries are used for to not get error when population
        const subCategoriesData = await SubCategory.find();
        const categoriesData = await Category.find();

        // geting categories with sub-categories [with ordering 1-2-3]
        const data = await FeatureOrder.findOne({ name: ENUM_CATEGORY_FEATURE.NAME }).select(`${ENUM_CATEGORY_FEATURE.KEY} -_id`).populate({
            path: ENUM_CATEGORY_FEATURE.KEY,
            populate: { path: "subCategories" }
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Category with sub-categories retrived successfully!`,
            meta: {
                total: data?.order.length || 0,
            },
            data: data?.order,
        });
    }
)

export default {
    GetCategoryWithSubCategories,
};