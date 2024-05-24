import mongoose from 'mongoose';
import { IErrorMessage, IErrorResponse } from '../type/types';

const handleValidationError = (
    error: mongoose.Error.ValidationError
): IErrorResponse => {
    const errors: IErrorMessage[] = Object.values(error.errors).map(
        (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: el?.path,
                message: el?.message,
            };
        }
    );
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};

export default handleValidationError;