import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import TimerIcon from '@mui/icons-material/Timer';
import Questions from './Questions';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Quiz = () => {
  const [checked, setChecked] = useState(undefined);
  const que = useSelector((state) => state.questionsreducer.que);
  const results = useSelector((state) => state.resultreducer.results);
  const trace = useSelector((state) => state.questionsreducer.trace);
  const dispatch = useDispatch();

  const [remainingTime, setRemainingTime] = useState(10);



  if (results.length >= 5) {
    return <Navigate to={'/results/'} replace={true}></Navigate>;
  }

  const onChecked = (checked) => {
    setChecked(checked);
  };

  return (
    <div className="display-container">
      <div className="header">
        <div className="number-of-count">
          <span className="number-of-question">{trace + 1} of 5 questions</span>
        </div>
        <div className="timer-div">
          <TimerIcon />
          <span className="time-left">{remainingTime}s</span>
        </div>
      </div>
      <div className="container">
        {que.insertedData && que.insertedData[0] && (
          <Questions onChecked={onChecked}   remainingTime={remainingTime} setRemainingTime={setRemainingTime} />
        )}
      </div>
    </div>
  );
};

export default Quiz;


