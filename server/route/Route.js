

const express=require('express')
const {  getQuestions,insertQuestions,dropQuestions,getResult,storeResult,dropResult}=require("../controllers/questioncontroller.js");

const router = express.Router();

router.get("/questions", getQuestions)
router.post("/questions",insertQuestions)
router.delete("/questions",dropQuestions)

router.get('/results',getResult)
router .post('/results',storeResult)
router  .delete('/results',dropResult)

module.exports=router