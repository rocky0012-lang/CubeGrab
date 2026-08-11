import React from "react";
import { sendEmail } from "@/lib/email";
import WelcomeUserEmail from "@/emails/welcome-user";

export async function GET() {
    try {
        await sendEmail({
            to: "francisgathua16@gmail.com",
            subject: "Testing CubeGrab Emails",
            react: React.createElement(WelcomeUserEmail, { firstName: "Francis" }),
        });

        return Response.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);

        return Response.json({
            success: false,
            message: "Failed to send email",
        }, { status: 500 });
    }
}
