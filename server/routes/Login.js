import express from 'express'
import {Login} from '../controllers/loginControllers.js'

const router = express.Router();
router.post('/',Login)

export default router
