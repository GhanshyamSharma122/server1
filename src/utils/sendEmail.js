
import nodemailer from "nodemailer"
const sendEmail=async(options)=>{
    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });
    const mailOptions={
    from:`crsp <${process.env.SMTP_EMAIL}>`,
    to:options.email,
    subject:options.subject,
    html:options.message,
}
await transporter.sendMail(mailOptions)
}
export {sendEmail}

