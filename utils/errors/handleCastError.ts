import mongoose from 'mongoose';
import { IErrorMessage } from '../type/types';

const handleCastError = (error: mongoose.Error.CastError) => {
    const errors: IErrorMessage[] = [
        {
            path: error.path,
            message: 'Passed id is invalid!',
        },
    ];

    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error occurs!',
        errorMessages: errors,
    };
};

export default handleCastError;