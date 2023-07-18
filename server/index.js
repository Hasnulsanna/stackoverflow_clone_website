import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import dotenv from 'dotenv'
import Otp from './routes/Otp.js';
import Login from './routes/Login.js';
import Chatbot from './routes/Chatbot.js'
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs'
import stripePackage from 'stripe';
import User from './models/auth.js'
import Post from './models/post.js'
import helmet from 'helmet';
import morgan from 'morgan';
import multer from "multer";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mediaAuth from './routes/media/mediaAuth.js';
import mediaPost from './routes/media/mediaPost.js';
import mediaUser from './routes/media/mediaUser.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const stripe = stripePackage("sk_test_51NOatmSI6GOQ6lgrKEWtbuFUmMIWHeMHo9gWvmop5EqNQMVvYCOD6k2HoYWooP6Q5BH9IDwt5LiGuhhjT0gQ5QtE00pWIQKcDO");
const app = express();
dotenv.config();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(morgan("common"));
// app.use("/images",express.static(path.join(__dirname, "public/images")))


app.get('/',(req,res) => {
    res.send("This is a stack overflow clone api")
})



app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/otp',Otp)
app.use('/login',Login)
app.use('/chatbot',Chatbot)
app.use("/api/auth", mediaAuth);
app.use("/api/users", mediaUser);
app.use("/api/posts", mediaPost);




app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const { plan } = req.body;

  // Update the user's plan field in the database
  User.findByIdAndUpdate(userId, { plan }, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update user plan' });
    });
});





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});






app.post('/payment', async (req, res) => {
  const { product, token } = req.body;
  const idempotencyKey = uuid();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100,
      currency: 'inr',
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchase of ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country,
        },
      },
    }, { idempotencyKey });

    // Update the user's plan in the database
    const userId = req.body.user_id;
    const plan = product.name;

    await User.findByIdAndUpdate(userId, { plan });
    // Fetch the updated user from the database
    const updatedUser = await User.findById(userId);
    console.log("sanna",updatedUser.plan);

    res.status(200).json({ paymentIntent, plan: updatedUser.plan });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Payment failed' });
  }
});





const PORT = process.env.PORT || 5000
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
    .catch((err)=>console.log(err.message))

    // https://stackoverflow-clone-sanna.onrender.com/

    // https://stackoverflow-sanna.netlify.app/Questions