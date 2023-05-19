import express from 'express';
import * as emailController from "../../controllers/userController/email.controller.js";
const router = express.Router();

router.post('/shedule-email',emailController.emailShedule);
router.post('/filter-email',emailController.filterEmail)

export default router;