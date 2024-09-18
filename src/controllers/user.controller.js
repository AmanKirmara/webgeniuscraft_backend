import { sendEmailToUser } from "../utils/mail.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

// Helper function to check if the date is today
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Contact Controller
const contact = async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Input validation for required fields
  if ([name, email, message].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      error: "Please fill in all fields",
    });
  }

  // 2. Validate the message length (e.g., max 500 characters)
  if (message.length > 500) {
    return res.status(400).json({
      error: "Message too long. Please limit your message to 500 characters.",
    });
  }

  // 3. Check the number of messages the user has sent today (rate limiting)
  try {
    const todayMessagesCount = await User.countDocuments({
      email: email,
      createdAt: { 
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),  // Start of the day
        $lt: new Date(new Date().setHours(23, 59, 59, 999)) // End of the day
      }
    });

    if (todayMessagesCount >= 2) {
      return res.status(429).json({
        error: "You have reached the limit of 2 messages for today. Please try again tomorrow.",
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: "Error checking message limit. Please try again later.",
    });
  }

  // 4. Save the message to the database
  try {
    const user = new User({ name, email, message });
    await user.save();

    // 5. Send email after saving user data
    await sendEmailToUser(email, user);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send message or store data",
      error: error.message,
    });
  }
};

export { contact };

