import User from '../models/auth.js'
import mongoose from 'mongoose'

export const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await User.find()
        const allUserDetails=[]
        allUsers.forEach(users=>{
            allUserDetails.push({_id:users.id,name:users.name,about:users.about,tags:users.tags,joinedOn:users.joinedOn})
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;


    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    try {
        const updatedProfile = await User.findByIdAndUpdate(
          _id,{ $set: { name: name, about: about, tags: tags } },{ new: true }
        );
        res.status(200).json(updatedProfile);
      } catch (error) {
        res.status(405).json({ message: error.message });
      }

};

export const updateQuestion = async (req, res) => {
    console.log(req.body);
    const { _id } = req.body.questionCount;
    
    if (_id) {
      const { plan,} = req.body.questionCount;
      console.log("plan", plan, _id);
      
      try {
        // Make sure to import the necessary modules
        const updatedQuestion = await User.findByIdAndUpdate(
          _id, 
          { $set: { plan: plan } }, 
          { new: true }
        );
        
        console.log(updatedQuestion);
        res.status(200).json({ result: updatedQuestion });
        
      } catch (error) {
        console.log("sanna");
        res.status(405).json({ message: error.message });
      }
    } 
    else{
    const{id}=req.body
    const {lastQuestionPostedDate,questionPostedCount}=req.body.questionCount;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("question unavailable...");
    }
    try{
        const updatedQuestion=await User.findByIdAndUpdate(
           id,{$set: { lastQuestionPostedDate: lastQuestionPostedDate, questionPostedCount: questionPostedCount}},{ new: true }
        )
        console.log(updatedQuestion);
        res.status(200).json({result:updatedQuestion});
    }catch(error){
        res.status(405).json({ message: error.message });
    }
}

}