import React   from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
const Home = () => {
    



 

  return (
      <div className='container'>
        <h1 >Quiz Application</h1>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form >
            <input className="userid" type="text" placeholder='Username*' />
        </form>

        <Link    to={'question'} className='start-button'>
            <button  className='start-button' >Start Quiz </button>
        </Link>

    </div>
  )
}

export default Home