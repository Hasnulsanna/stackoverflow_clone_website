import express from 'express'
import {updateUserProfile} from '../controllers/profileControllers.js'
import multer from "multer"


const upload = multer({ dest: '/uploads' });


const router = express.Router();



router.put('/profile/:name', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPicture', maxCount: 1 }]), updateUserProfile);


export default router