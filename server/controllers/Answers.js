import Questions from '../models/Questions.js'
import mongoose from 'mongoose'


export const postAnswer = async (req,res) =>{
    
//id is a aparameter or params
    const{id:_id} = req.params;
    const {noOfAnswers,answerBody,userAnswered,userId}=req.body;
//if id is valid
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question is unavailable...')
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try {
        //Questions is schema,post and patch will have userid
        //addtoset:set value and adding value to the answer array in db
        const updatedQuestion=await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId }]}})
        res.status(200).json(updatedQuestion)

    } 
    catch (error) {
        res.status(400).json(error);
        
    }
}


//another functn to add no of answers which is outside the answer array
const updateNoOfQuestions = async (_id,noOfAnswers)=>{
    try {
        //set is to replace the value not to add if it is an array we can add new value
        await Questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
    } catch (error) {//we doesnt pass res
        console.log(error)
    }
}


export const deleteAnswer = async(req,res)=>{
    const {id:_id}=req.params
    const{answerId,noOfAnswers}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question is unavailable...')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('answer is unavailable...')
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try {
        await Questions.updateOne(
            { _id },
            {$pull:{'answer':{_id:answerId}}}
        )
        res.status(200).json({message:"Successfully Deleted.."})
    } catch (error) {
        res.status(405).json(error)
        
    }
}