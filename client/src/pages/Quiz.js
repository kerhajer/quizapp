import React ,{useState} from 'react'
import '../css/Home.css'
import TimerIcon from '@mui/icons-material/Timer';
import Questions from '../components/Questions';

import {moveNextAction, movePrevAction } from '../redux/questionsSlice'

import { useSelector, useDispatch } from 'react-redux'


const Quiz = () => {
  const [check, setChecked] = useState(undefined)

  const { queue, trace } = useSelector((state) => state.questionsreducer.questions);
  const questions = useSelector((state) => state.questionsreducer.questions);

    const dispatch = useDispatch()

    /** next button event handler */
 

    function onChecked(check){
        setChecked(check)
    }


    const onNext=(e)=> {
     
        if (trace < queue.length) {
          dispatch(moveNextAction());
        }
        setChecked(undefined);
   
    }
    const onPrev=(e)=> {
      if (trace > 0) {
        dispatch(movePrevAction());
      }
    }

  

  return (
    <div className="display-container">
    <div className="header">
      <div className="number-of-count">
        <span className="number-of-question">1 of 5 questions</span>
      </div>
      <div className="timer-div">
        <TimerIcon/>
        <span className="time-left">10s</span>
      </div>
    </div>
    <div className="container">
    <Questions onChecked={onChecked} />
    </div>

<div className='grid'>
{trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="next-button" onClick={onNext}>
          Next
        </button>
</div>
  </div>
  )
}

export default Quiz