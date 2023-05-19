import emailSheduleModel from "../../model/emailShedule.model.js";

// get all sheduled email
export const getAllSheduledEmail = async (req, res) => {
  try {
    const getAllEmails = await emailSheduleModel.find({});
    console.log(getAllEmails, "getAllEmails");
    if (getAllEmails.length == 0) {
      res.status(404).send({ msg: "Data is not found" });
    } else {
      res.status(200).send({ msg: "this is users data",getAllEmails });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
};
