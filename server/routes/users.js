import express from 'express'
import {login,signup} from '../controllers/auth.js'
import {getAllUsers,updateProfile,updateQuestion} from '../controllers/users.js'
import auth from '../middleware/auth.js'



const router=express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',updateProfile)
router.patch('/questionupdate',updateQuestion)

export default router