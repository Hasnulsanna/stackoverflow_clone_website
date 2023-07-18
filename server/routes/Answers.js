import express from 'express'
import {postAnswer,deleteAnswer} from '../controllers/Answers.js'
import auth from '../middleware/auth.js'


const router=express.Router()

//export controller
router.patch('/post/:id',postAnswer)
router.patch('/delete/:id',deleteAnswer)


export default router