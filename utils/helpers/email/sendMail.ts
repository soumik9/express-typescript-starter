import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import transporter from "../../server/transporter";
import { config } from "../../server";
import { errorLogger, infoLogger } from "../logger/logger";

interface ISendMail {
    email: string;
    subject: string;
    content: string;
}

const sendMail = async ({ email, subject, content }: ISendMail) => {
    try {
        await transporter.verify();
        infoLogger.info(`Server is ready to take our messages`);

        const response = await transporter.sendMail({
            from: config.SENDER_EMAIL_ID,
            to: email,
            subject: subject,
            html: content
        });

        return response;
    } catch (error) {
        errorLogger.error(`Error on mail server: ${error instanceof Error ? error.message : 'unknown'}`);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to send email to user.');
    }
};

export default sendMail;