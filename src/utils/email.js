import nodemailer from 'nodemailer';

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

export const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: '"Ando 👻" <Shop@armenia.com>',
        to: email,
        subject,
        text,
    });
};
