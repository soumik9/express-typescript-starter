import { z } from 'zod';

const setPasswordByInvitationValidation = z.object({
    body: z.object({
        data: z.string({
            required_error: 'data is required',
        }).transform(value => {
            const parsedData = JSON.parse(value); // Assuming data is JSON

            if (!(parsedData && typeof parsedData === 'object')) {
                throw new Error('Invalid data format'); // chekcing json format
            }
            return parsedData;
        }).refine(parsedData => {
            return 'email' in parsedData && 'password' in parsedData && 'confirmPassword' in parsedData; // requires properties
        }, {
            message: 'data must contain email, password & confirmPassword keys',
            path: ['formData', 'data']
        }).refine(parsedData => {
            return parsedData.password.length >= 6; // check password minimum length
        }, {
            message: 'password must be at least 6 characters long',
            path: ['formData', 'data', 'password']
        }).refine(parsedData => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // valid email check
            return emailRegex.test(parsedData.email);
        }, {
            message: 'email must be a valid email address',
            path: ['formData', 'data', 'email']
        }),
    }),
});

export default {
    setPasswordByInvitationValidation,
};