import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions, insertQuestions, moveNextAction, movePrevAction, startExamAction } from '../redux/questionsSlice';
export default function Questions({ onChecked }) {
  const dispatch = useDispatch();
  const questions= useSelector((state) => state.questionsreducer.questions);

  const [checked, setChecked] = useState(undefined);
  const { queue, trace } = useSelector((state) => state.questionsreducer.questions);

const [insertedData,setInsertedData]=useState([]);

  useEffect(() => {
    dispatch(insertQuestions(insertedData))

  }, []);


  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    setInsertedData()
  }


  return (
    <div className="questions">
      {questions.map((data, index) => (
        <div key={index}>
          {data.questions.map((el, questionIndex) => (
            
            <div key={questionIndex}>
              <h2 className="questions">{el.question}</h2>
              <div className='ul'>
                
                { el.options.map((q, i) => (
                 <div  className='li'   key={i}>
                 <input 
                     type="radio"
                     value={false}
                     name="options"
                     id={`q${i}-option`}
                     onChange={() => onSelect(i)}
                 />

                 <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                 <div></div>
             </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}