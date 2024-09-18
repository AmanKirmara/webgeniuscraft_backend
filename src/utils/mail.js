import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using Gmail SMTP
export const sendEmailToUser = async (email, userObj) => {
  console.log("Using email:", process.env.SERVER_EMAIL);
  console.log("App password:", process.env.EMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SERVER_EMAIL,  // Using amankirmara143@gmail.com
      pass: process.env.EMAIL_PASSWORD, // App-specific password generated from Google
    },
  });

  // 1. Email to the admin (your email)
  const adminMailOptions = {
    from: process.env.SERVER_EMAIL,    // Sender's email address
    to: process.env.APP_EMAIL,         // Admin's email address (your email: iamankirmara143@gmail.com)
    subject: "New Message from User",
    text: `You received a new message from ${userObj.name}:

- Name: ${userObj.name}
- Email: ${userObj.email}
- Message: ${userObj.message}

Please follow up as soon as possible.`,
  };

  // 2. Email to the user (user who filled the form)
  const userMailOptions = {
    from: process.env.SERVER_EMAIL,    // Sender's email address
    to: email,                         // Recipient's email address (dynamic user email)
    subject: "Thank You for Your Message",
    text: `Hello ${userObj.name},

Thank you for reaching out to us. Here is a summary of your message:
- Name: ${userObj.name}
- Email: ${userObj.email}
- Message: ${userObj.message}

We will get back to you soon.

Best regards,
WebGeniusCraft`,
  };

  try {
    // Send email to the admin (you)
    const adminInfo = await transporter.sendMail(adminMailOptions);

    // Send email to the user
    const userInfo = await transporter.sendMail(userMailOptions);
    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
