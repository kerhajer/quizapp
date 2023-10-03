

const express=require('express')
const {  getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult,getQuestionsbyid }=require("../controllers/questioncontroller.js");

const router = express.Router();

router.get("/questions", getQuestions)
router.get("/questions/find/:id", getQuestionsbyid)

router.post("/questions",insertQuestions)
router.delete("/questions",dropQuestions)

router.get('/results',getResult)
router.post('/results/',storeResult)
router.delete('/results',dropResult)

module.exports=router