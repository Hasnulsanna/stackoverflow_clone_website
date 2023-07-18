import express from 'express'
import {Chatbot} from '../controllers/chatbotControllers.js'

const router = express.Router();
router.post('/',Chatbot)

export default router
