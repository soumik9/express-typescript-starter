import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import transporter from "../../server/transporter";
import logger from "../logger/logger";
import { config } from "../../server";

interface ISendMail {
    email: string;
    subject: string;
    content: string;
}

const sendMail = async ({ email, subject, content }: ISendMail) => {
    try {
        await transporter.verify();
        logger.log("info", `Server is ready to take our messages`);

        const response = await transporter.sendMail({
            from: config.SENDER_EMAIL_ID,
            to: email,
            subject: subject,
            html: content
        });

        return response;
    } catch (error) {
        logger.log("error", `Error on mail server: ${error instanceof Error ? error.message : 'unknown'}`);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to send email to user.');
    }
};

export default sendMail;