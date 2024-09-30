// Import the Nodemailer library
import nodemailer from 'nodemailer';

// Create a transporter object
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 2525,
  secure: false, // use SSL
  auth: {
    user: "afridhoikhsan@gmail.com",
    pass: "meeh adxf qjsv ofjq",
  },
});