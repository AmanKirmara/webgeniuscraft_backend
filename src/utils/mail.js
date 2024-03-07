import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using your Gmail account

export const sendEmailToUser = async (email, userObj) => {
  console.log( process.env.SERVER_EMAIL + ' server email')
  console.log( process.env.EMAIL_PASSWORD + ' password')
  console.log(userObj + " user full obj")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      //console all variables 
      user: process.env.SERVER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: "Test Email",
    text: `Hello ${userObj.name},

Thank you for reaching out. We received your message request with the following details:
- Name: ${userObj.name}
- Email: ${userObj.email}
- Message: ${userObj.message}

We will get back to you as soon as possible.

Best regards,
Your Company Name`,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
