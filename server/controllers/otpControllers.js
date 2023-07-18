
import userotp from '../models/userOtp.js';
import nodemailer from "nodemailer";
import validator from 'validator';


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hasnulsanna7@gmail.com",
    pass: "vixgozgcosycrxqm"
  }
});




export const Otp = async (req,res) =>{
  const { email } = req.body;
  console.log(email);
  if (!email) {
    res.status(400).json({ error: "Please enter your email" });
    return;
  }

  try {
    const preuser = await userotp.findOne({ email: email });
    if (preuser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const existEmail = await userotp.findOneAndUpdate({ email: email }, { otp: OTP }, { new: true });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email for OTP Verification",
        text: `OTP: ${OTP}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email not sent:", error);
          res.status(400).json({ error: "Email not sent" });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ message: "Email sent successfully" });
        }
      });
    } else {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const saveOtpData = new userotp({ email, otp: OTP });
      await saveOtpData.save();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email for OTP Verification",
        text: `OTP: ${OTP}`
      };
      console.log(mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email not sent:", error);
          res.status(400).json({ error: "Email not sent" });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ message: "Email sent successfully" });
        }
      });
    }
  } catch (error) {
    console.error("Invalid Details:", error);
    res.status(400).json({ error: "Invalid Details" });
  }
};
