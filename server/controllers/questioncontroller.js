
const Questions = require('../models/QuestionsSchema')
const Results=require('../models/ResultsSchema')
const {  questions,answers}=require("../Data/data.js");

const getQuestions= async(req, res)=>{
    try {
        const q= await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}
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

/** post all result */
const calculateScore = (userAnswers, correctAnswers) => {
    let score = 0;
    for (const userAnswer of userAnswers) {
        const questionId = userAnswer.questionId;
        const userSelectedAnswer = userAnswer.answer;

        // Find the index of the question in the correctAnswers array
        const correctAnswerIndex = correctAnswers.findIndex(answer => answer.questionId === questionId);

        if (correctAnswerIndex !== -1 && correctAnswers[correctAnswerIndex].answer === userSelectedAnswer) {
            score=score+20;
        }
    }
    return score;
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

        const userScore = calculateScore(result, correctAnswers);



        // Set the points to the calculated userScore
        const insertedData = await Results.create({ username, result, attempts:result.length, points: userScore, achieved:userScore >= 50 ? "succeeded" : "low" });

        res.json({ msg: "Result Saved Successfully...!", insertedData, userScore });
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
module.exports={ getQuestions, insertQuestions, dropQuestions,getResult,dropResult,storeResult }