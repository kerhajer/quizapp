import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetResultAction, storeResult ,GetResultbyid} from '../redux/resultSlice';


import { Navigate } from 'react-router-dom'

export default function Result() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.resultreducer.results);
  const userId = useSelector((state) => state.resultreducer.userId);
  const que = useSelector((state) => state.questionsreducer.que);

  const [buttonClicked, setButtonClicked] = useState(false);



  
  const createResultData = () => {
    if (!results || !Array.isArray(results)) {
      return null;
    }
  
    const result = results.map((answer, questionId) => ({
      questionId: questionId + 1, // Assuming question IDs start from 1
      answer: answer !== undefined && answer !== null ? answer.toString() : null, // Convert answer to string if not undefined or null
    }));
  
    return {
      username: userId,
      result,
    };
  };

  const handleButtonClick = () => {
    const resultData = createResultData();

    if (resultData) {
      dispatch(storeResult(resultData));
      setButtonClicked(true);
    }
  };

  if (buttonClicked && results.insertedData) {
    return <Navigate to={`/results/${results.insertedData._id}`} replace={true}></Navigate>;
  }

  return (
    <div className='container'>

      
      <button onClick={handleButtonClick} className='title text-light'>
        Voir résultat
      </button>
    </div>
  );
}