import emailSheduleModel from "../../model/emailShedule.model.js";
import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv"
dotenv.config()

//node mailer
let mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: process.env.EMAIL_OTP,
    pass: process.env.APP_PASSWORD_EMAIL,
  },
});

// shedule email function
const scheduleEmail = (scheduledTime, email,subject) => {
  const currentDate = new Date();
  const scheduledDateTime = new Date(scheduledTime);

  const timeDifference = scheduledDateTime - currentDate;
  if (timeDifference <= 0) {
    // If the scheduled time has already passed, return without sending the email
    return;
  }

  const timeout = setTimeout(() => {
    // Send the email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #333;">Scheduler Email</h2>
        <p style="margin-top: 10px; margin-bottom: 20px; font-size: 16px;">Thank you for scheduling an event with us!</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Current Time:</td>
            <td style="padding: 10px;">${currentDate.toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Scheduled Time:</td>
            <td style="padding: 10px;">${scheduledDateTime.toLocaleTimeString()}</td>
          </tr>
        </table>
      </div>
    `;

    const details = {
      from: process.env.EMAIL_OTP,
      to: email,
      subject: "Scheduler Email: Confirming Your Scheduled Event",
      html: emailContent,
    };

    mailTransport.sendMail(details, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });
  }, timeDifference);

  const interval = setInterval(() => {
    // Clear the timeout and interval if the scheduled time is reached
    clearTimeout(timeout);
    clearInterval(interval);
  }, timeDifference)
    new emailSheduleModel({
      email:email,
      subject:subject,
      Shedule:scheduledTime
    })
    .save()

  
};


// shedule email
export const emailShedule = async (req, res) => {
  try {
    const { email, subject, shedule } = req.body;

    let currentDate = new Date();
    let scheduledTime = new Date(shedule);
    console.log(req.body);
    console.log(scheduledTime, "scheduledTime");

    //email content
    let emailContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <h2 style="color: #333;">Scheduler Email</h2>
        <p style="margin-top: 10px; margin-bottom: 20px; font-size: 16px;">Thank you for scheduling an event with us!</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Current Time:</td>
            <td style="padding: 10px;">${currentDate.toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Scheduled Time:</td>
            <td style="padding: 10px;">${scheduledTime.toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Subject:</td>
            <td style="padding: 10px;">${subject}</td>
          </tr>
        </table>
      </div>
    `;
    if (shedule) {
      console.log("Hiii");
      scheduleEmail(scheduledTime, email,subject)
      
    } else {
      console.log("hlooo");
      let details = {
        from: process.env.EMAIL_OTP,
        to: email,
        subject: "Otp for registration is: ",
        html: emailContent,
      };
      mailTransport.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ status: false, error: err });
        } else {
          console.log("email is sent");
          res
            .status(200)
            .send({ status: true, email: true, msg: "email sent succesfuly" });
        }
      });
      new emailSheduleModel({
        email:email,
        subject:subject,
        Shedule:scheduledTime
      })
      .save()
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

//filter data with start and end date

export const filterEmail = async (req, res) => {
  try {
    const {startTime, endTime}=req.body;
    const start = new Date(startTime); // Start date
    const end = new Date(endTime); // End date
    console.log(start,"gsdfgsdgfsdfg",end);
    // Assuming you have a MongoDB collection named "scheduledEmails"
  let emails= await emailSheduleModel.find({
      Shedule: {
        $gte: start,
        $lte: end
      }
    });
    if(!emails.length==0){
      res.status(200).send({msg:"filtered data",emails})
    }else{
      res.status(404).send({msg:"Emails not found"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};
