import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  moveNextAction, movePrevAction } from '../redux/questionsSlice';
import { pushResultAction, updateResultAction} from '../redux/resultSlice'
          const Questions = ({ onChecked,setRemainingTime,remainingTime}) => {
  const dispatch = useDispatch();
  const que= useSelector((state) => state.questionsreducer.que);
  const results= useSelector((state) => state.resultreducer.results);



  const [isOptionSelectedArray, setIsOptionSelectedArray] = useState(
    new Array(que.insertedData[0].questions.length).fill(false)
  );

  const [checked, setChecked] = useState(undefined);
  const trace  = useSelector((state) => state.questionsreducer.trace);

  useEffect(() => {
    dispatch(updateResultAction({ trace, checked}))
}, [checked])


const onNext = () => {
  dispatch(moveNextAction());


  if(results.length === trace ){
    dispatch(pushResultAction(checked))
}
setChecked(undefined)
setRemainingTime(10);
const updatedArray = new Array(que.insertedData[0].questions.length).fill(false);
setIsOptionSelectedArray(updatedArray);
}

useEffect(() => {
  if (remainingTime === 0) {
    onNext(); // Call onNext only when remainingTime reaches zero
  } else if (remainingTime > 0) {
    const interval = setInterval(() => {
      setRemainingTime((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }
}, [remainingTime]);


  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResultAction({ trace, checked}))


      const updatedArray = new Array(que.insertedData[0].questions.length).fill(false);
  updatedArray[i] = true;
  setIsOptionSelectedArray(updatedArray);
  }
  useEffect(() => {
    setRemainingTime(10);
  }, [trace, setRemainingTime]);

 
  const onPrev = () => {
    dispatch(movePrevAction());
  };


  return (
    <div className="container">
       {trace >= 0 && (

        <div className="card" style={{  alignSelf:'center' ,width: '35rem' }}>
          <h2 className="title"      >{que.insertedData[0].questions[trace].question}</h2>

          <div className='ul'>
            {que.insertedData[0].questions[trace].options.map((q, i) => (
              
              <div className={isOptionSelectedArray[i] ? 'liselected' : 'li'} key={i}>
                <input
                type="radio"
                 value={false}
                  name="options"
                  id={`q${i}-option`}
                  checked={isOptionSelectedArray[i]}

                  onChange={() => onSelect(i)}
                  
                />
                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
               <span style={{marginLeft:'300px'}}> {     isOptionSelectedArray[i] ? ' ✓' : ''}</span> 
  
              </div>
              
            ))}
           <div className='questionFooter'>
              {trace > 0 ? (
                <button className="prev-button" onClick={onPrev}>
                  Prev
                </button>
              ) : (
                <div></div>
              )}
              {(trace < que.insertedData[0].questions.length) ?  (
                <button  className='next-button'
                onClick={onNext}>
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
