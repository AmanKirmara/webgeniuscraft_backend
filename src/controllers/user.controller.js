import { sendEmailToUser } from "../utils/mail.js";
import { User } from "../models/user.model.js";

const contact = async (req, res) => {
  const { name, email, message } = req.body;
//   console.log(req.body);
//   console.log(name);
  if ([name, email, message].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      error: "Please fill in all fields",
    });
  }

  const user = await User.create({
    name: name,
    email: email,
    message: message,
  });
  await user.save();

  if (!user) {
    return res.status(400).json({
      error: "Something went wrong while saving data ",
    });
  }

  console.log(process.env.APP_EMAIL + ": " + user.email)
  sendEmailToUser(process.env.APP_EMAIL, user);

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: user,
  });
};

export { contact };
