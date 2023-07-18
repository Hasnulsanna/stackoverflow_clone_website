import express from 'express'
import {AskQuestion,getAllquestions,deleteQuestion,voteQuestion} from '../controllers/Questions.js'
import auth from '../middleware/auth.js'



const router=express.Router()

router.post('/Ask',AskQuestion)
router.get('/get',getAllquestions)
router.delete('/delete/:id',deleteQuestion);
router.patch('/vote/:id',voteQuestion)


export default router