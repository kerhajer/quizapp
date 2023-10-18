

const express=require('express')
const {  getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult,getQuestionsbyid, getResultbyid }=require("../controllers/questioncontroller.js");

const router = express.Router();

router.get("/questions", getQuestions)
router.get("/questions/find/:id", getQuestionsbyid)

router.post("/questions",insertQuestions)
router.delete("/questions",dropQuestions)

router.get('/results',getResult)
router.get('/results/:id',getResultbyid)

router.post('/results/',storeResult)
router.delete('/results',dropResult)

module.exports=router