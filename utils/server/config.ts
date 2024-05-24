import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    MONGOOSE_URI: process.env.MONGOOSE_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,

    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_SECRET_EXP: process.env.TOKEN_SECRET_EXP,

    BYCRYPT_SALT_ROUND: process.env.BYCRYPT_SALT_ROUND,

    SENDER_EMAIL_NAME: process.env.SENDER_EMAIL_NAME,
    SENDER_EMAIL_HOSTNAME: process.env.SENDER_EMAIL_HOSTNAME,
    SENDER_EMAIL_PORT: process.env.SENDER_EMAIL_PORT,
    SENDER_EMAIL_ID: process.env.SENDER_EMAIL_ID,
    SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,
};