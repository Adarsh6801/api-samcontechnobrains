import express from 'express';
import * as emailController from "../../controllers/userController/email.controller.js";
import * as userController from "../../controllers/userController/user.controller.js"
const router = express.Router();

router.post('/shedule-email',emailController.emailShedule);
router.post('/filter-email',emailController.filterEmail);

router.get('/get-all-sheduled-email',userController.getAllSheduledEmail);

export default router;