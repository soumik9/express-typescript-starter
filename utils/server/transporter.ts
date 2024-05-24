import nodemailer from 'nodemailer'
import config from './config'

const transporter = nodemailer.createTransport({
    host: config.SENDER_EMAIL_HOSTNAME,
    port: Number(config.SENDER_EMAIL_PORT),
    auth: {
        user: config.SENDER_EMAIL_ID,
        pass: config.SENDER_EMAIL_PASSWORD,
    },
})

export default transporter 