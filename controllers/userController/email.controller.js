
import emailSheduleModel from "../../model/emailShedule.model.js";


// shedule email
export const emailShedule = async (req, res) => {
    try {
      
      res.status(200).send({ msg: "this is users data" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal server error" });
    }
  };

  
  //filter data with start and end date

  export const filterEmail= async (req,res)=> {
    try{

    }catch(error){
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
  }