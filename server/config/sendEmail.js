import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.RESEND_API_KEY) {
    console.log("Provide RESEND_API in side the .env file")
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'FatafatCart <onboarding@resend.dev>',
            to: sendTo,
            subject,
            html,
        });

        if (error) {
            console.log("Resend Error:", error);
            throw new Error(error.message);
        }

        console.log("Email sent:", data);
        return data;

    } catch (error) {
        console.log("SendEmail Catch Error:", error);
        throw error;
    }
}

export default sendEmail
