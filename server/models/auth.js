import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String },
    tags:{type:[String] },
    joinedOn:{type:Date,default:Date.now},
    plan: { type: String, default: null },
    lastQuestionPostedDate: {
        type: Date,
        default: () => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return yesterday;
        }
      },
    questionPostedCount: { type: Number, default: 0 },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default:""
    },

},{ timestamps: true })

export default mongoose.model("User",userSchema)