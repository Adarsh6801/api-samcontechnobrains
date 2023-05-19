
import emailSheduleModel from "../../model/emailShedule.model.js";


// shedule email
export const getAllSheduledEmail = async (req, res) => {
    try {
      
      res.status(200).send({ msg: "this is users data" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal server error" });
    }
  };
