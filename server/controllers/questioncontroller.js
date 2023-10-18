
const Questions = require('../models/QuestionsSchema')
const Results=require('../models/ResultsSchema')
const { questions,answers}=require("../Data/data.js");

const getQuestions= async(req, res)=>{
    try {
        const question= await Questions.find({ questions });
        res.json(question)
    } catch (error) {
        res.json({ error })
    }
}


const getQuestionsbyid = async (req, res,next) => {
    try {
        const questionid = await Questions.findById(req.params.id); 
    
        if (!questionid) {
          return res.json({ message: 'Question introuvable' });
        }
    
        res.json(questionid);
      } catch (error) {
        res.json({ error })
      }
    };
  






const insertQuestions = async (req, res) => {
    try {
        const insertedData = await Questions.insertMany({ questions, answers });

        res.json({ msg: "Data Saved Successfully...!", insertedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to insert data." });
    }
};
/** Delete all Questions */
const dropQuestions= async(req, res)=>{
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** get all result */
const getResult= async(req, res)=>{
    try {
        const r = await Results.find()
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}



const getResultbyid = async (req, res,next) => {
    try {
        const resultid = await Results.findById(req.params.id); 
    
        if (!resultid) {
          return res.json({ message: 'result introuvable' });
        }
    
        res.json(resultid);
      } catch (error) {
        res.json({ error })
      }
    };









    const calculateScore = (userAnswers, correctAnswers) => {
        let correctCount = 0; // Initialize a count for correct answers
    
        for (const userAnswer of userAnswers) {
            const questionId = userAnswer.questionId;
            const userSelectedAnswer = userAnswer.answer;
    
            const correctAnswerIndex = correctAnswers.findIndex(answer => answer.questionId === questionId);
    
            if (correctAnswerIndex !== -1 && correctAnswers[correctAnswerIndex].answer === userSelectedAnswer) {
                correctCount++; // Increment the count for each correct answer
            }
        }
    
        return correctCount; // Return the count of correct answers
    };
    
    const storeResult = async (req, res) => {
        try {
            const { username, result, attempts, points, achieved } = req.body;
    
            if (!username || !result) {
                throw new Error('Username and result data must be provided.');
            }
    
            const correctAnswers = [
                { questionId: 1, answer: "0" },
                { questionId: 2, answer: "1" },
                { questionId: 3, answer: "2" },
                { questionId: 4, answer: "1" },
                { questionId: 5, answer: "0" }
            ]; // Correct answers array
    
            const correctCount = calculateScore(result, correctAnswers);
    
            const insertedData = await Results.create({ username, result, attempts: correctCount, points: correctCount * 20, achieved: correctCount >= 3 ? "succeeded" : "low" });
    
            res.json({ msg: "Result Saved Successfully...!", insertedData, correctCount });
        } catch (error) {
            console.error("Error storing result:", error);
            res.status(500).json({ error: "Failed to store result." });
        }
    };

/** delete all result */
const dropResult= async(req, res)=>{
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}
module.exports={ getQuestions, insertQuestions, dropQuestions,getResult,dropResult,storeResult,getQuestionsbyid,getResultbyid ,getResult}