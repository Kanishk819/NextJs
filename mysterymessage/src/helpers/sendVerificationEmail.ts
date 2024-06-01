import { resend } from "../lib/resend";
import VerificationEmail from "../../emails/Verification";
import { Apiresponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
): Promise<Apiresponse>{
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Mystery Message | Verification Code',
            react: VerificationEmail({username, otp : verifyCode}),
          });
        return {success : true , message : "Verification Email sent successfully"}
    } catch (emailError) {
        console.error("Error Sending Verifictaion Email",emailError)
        return {success : false , message : "Failed to send Verification Email"}
    }
}