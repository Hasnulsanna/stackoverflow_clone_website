import express from 'express'
import {Otp} from '../controllers/otpControllers.js'





const router = express.Router();
router.post('/',Otp)


export default router
