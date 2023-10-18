import React ,{ useRef }
from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import { useDispatch } from 'react-redux'
import { insertQuestions } from '../redux/questionsSlice'
import { setUserId } from '../redux/resultSlice'
const Home = () => {



 const inputRef = useRef(null)
 const dispatch = useDispatch()



  return (
      <div className='containerr'>
        <h1 >Quiz Application</h1>

        <ol>
            <li>You will be asked 5 questions one after another.</li>
            <li>20 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form >
        <input ref={inputRef} className="userid" type="text" placeholder='Username*' />

        </form>

        <Link    to={'questions'} className='start-button'>
            <button  onClick={() => {
  dispatch(insertQuestions());
  if (inputRef.current?.value) {
    dispatch(setUserId(inputRef.current?.value));
  }

}}  className='start-button' >Start Quiz </button>
        </Link>

    </div>
  )
}

export default Home