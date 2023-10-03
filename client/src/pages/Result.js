import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetResultAction, storeResult } from '../redux/resultSlice';
import { useNavigate } from 'react-router-dom';
import {resetAllAction}from '../redux/questionsSlice'
export default function Result() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.resultreducer.results);
  const userId = useSelector((state) => state.resultreducer.userId);
  const que = useSelector((state) => state.questionsreducer.que);
  const navigate=useNavigate()

  const createResultData = () => {
    if (results && Array.isArray(results)) {
      return {
        username: userId,
        result: results.map((answer, questionId) => ({
          questionId: questionId + 1, // Assuming question IDs start from 1
          answer: answer.toString(), // Convert answer to string if necessary
        })),
      };
    }
    return null;
  };

  useEffect(() => {
    // Create the resultData object
    const resultData = createResultData();

    if (resultData) {
      // Dispatch resultData
      dispatch(storeResult(resultData));
    }
  }, []);

  function onRestart() {
    dispatch(resetResultAction());
    dispatch(resetAllAction())
    navigate('/')
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

      <div className='result flex-center'>
      <div className='flex'>
                <span>Username : </span>
                <span className='bold'>{userId || ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{results.userScore || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ results.insertedData.result.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{results.insertedData.attempts  || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{results.insertedData.points|| 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result :</span>
                <span style={{ color : "red"  }} className='bold'>{ results.insertedData.achieved}</span>
            </div>
      </div>

      <div className="start">
        <button className='btn'  onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}