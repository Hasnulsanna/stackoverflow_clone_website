import express from 'express'
import {Payment} from '../controllers/paymentControllers'





const router = express.Router();
router.post('/',Payment)


export default router
