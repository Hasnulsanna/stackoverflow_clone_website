import express from 'express'
import {Configuration,OpenAIApi} from 'openai'


const configuration = new Configuration({
    apiKey:"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"
});
const openai = new OpenAIApi(configuration)

export const Chatbot = async (req, res) => {
    console.log(req.body);
    const question = req.body.question;
    console.log(question);
  
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 2000,
      });
      console.log("sanna");
      const lines = completion.data.choices[0].text;
      const answers = lines.split("\n");
      console.log(answers);
      return res
        .status(200)
        .json({ message: "Answer generated successfully", question: question, answer: answers });
    } catch (error) {
      console.error("Invalid Details:", error);
      res.status(400).json({ error: "Invalid Details" });
    }
  };
  
