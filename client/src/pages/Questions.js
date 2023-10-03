import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  moveNextAction, movePrevAction } from '../redux/questionsSlice';
import { pushResultAction, updateResultAction} from '../redux/resultSlice'
const Questions = ({ onChecked}) => {
  const dispatch = useDispatch();
  const que= useSelector((state) => state.questionsreducer.que);
  const results= useSelector((state) => state.resultreducer.results);

  const [checked, setChecked] = useState(undefined);
  const trace  = useSelector((state) => state.questionsreducer.trace);

  useEffect(() => {
    dispatch(updateResultAction({ trace, checked}))
}, [checked])

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResultAction({ trace, checked}))

  }


  const onPrev = () => {
    dispatch(movePrevAction());
  };

  const onNext = () => {
    dispatch(moveNextAction());


    if(results.length === trace ){
      dispatch(pushResultAction(checked))
  }
   
  

setChecked(undefined)
}


  return (
    <div className="container">
       {trace >= 0 && (

        <div className="card" style={{  alignSelf:'center' ,width: '25rem' }}>
          <h2 className="questions"      >{que.insertedData[0].questions[trace].question}</h2>
          <div className='ul'>
            {que.insertedData[0].questions[trace].options.map((q, i) => (
              <div className='li' key={i}>
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-option`}
                  onChange={() => onSelect(i)}
                />
                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>

              </div>
              
            ))}
           <div className='grid'>
              {trace > 0 ? (
                <button className="prev-button" onClick={onPrev}>
                  Prev
                </button>
              ) : (
                <div></div>
              )}
              {(trace < que.insertedData[0].questions.length) ?  (
                <button className="next-button" onClick={onNext}>
                  Next
                </button>
                ) : (
                  <div><button  className="next-button" >
                  result 
                </button> </div>
                )}
            
            </div>
         



          </div>
        </div>
      )}


    </div>
  );
};
export default Questions;
