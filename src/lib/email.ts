import { Resend } from "resend";
import React from "react";

export const resend = new Resend (process.env.RESEND_API_KEY);

interface SendingEmailProps {
    to: string | string[];
    subject: string;
    react: React.ReactElement;
}

export async function sendEmail({
    to,
    subject,
    react,
}: SendingEmailProps) {
    const  { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        replyTo: process.env.SUPPORT_EMAIL!,
        to,
        subject,
        react,
    });

    if (error) {
        console.error("Resend Error:", error);
        throw new Error(error.message);
    }

    return data;
}