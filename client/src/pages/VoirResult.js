import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetResultAction, GetResultbyid } from '../redux/resultSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { resetAllAction } from '../redux/questionsSlice';
import CheckIcon from '@mui/icons-material/Check';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function VoirResult() {
  const dispatch = useDispatch();
  const voirresultat = useSelector((state) => state.resultreducer.voirresultat);
  const results = useSelector((state) => state.resultreducer.results);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.resultreducer.userId);

  useEffect(() => {
    // Assuming you have access to the result ID in your component's props
    dispatch(GetResultbyid(results.insertedData._id));
  }, []);

  function onRestart() {
    dispatch(resetResultAction());
    dispatch(resetAllAction());
    navigate('/');
  }

  return (
    <div className='containerr'>
      <div className='headerr'>
        {voirresultat && voirresultat.achieved === 'succeeded' ? (
          <CheckIcon className='ac'></CheckIcon>
        ) : (
          <ThumbDownAltIcon className='i'></ThumbDownAltIcon>
        )}
        <h1 className="title">
          {voirresultat && 'points' in voirresultat
            ? `${userId} did ${
                voirresultat.points > 60
                  ? 'an amazing'
                  : voirresultat.points < 60
                  ? 'a poor'
                  : 'a good'
              } job!`
            : 'Loading...' /* or handle the undefined case in your preferred way */
          }
        </h1>
      </div>

      {voirresultat && Object.keys(voirresultat).length > 0 && (
        <div className='startt'>
          <span className='b'>Username:</span>
          <span className='bold'> {userId}  </span>
        </div>
      )}
<hr></hr>      {voirresultat && Object.keys(voirresultat).length > 0 && (
        <div className='startt'>
          <span className='b'>Total Questions:</span>
          <span className='bold'>{voirresultat.result.length}</span>
        </div>
      )}
<hr></hr>      {voirresultat && Object.keys(voirresultat).length > 0 && (
        <div className='startt'>
          <span className='b'>correct:</span>
          <span className='bold'>{voirresultat.attempts}</span>
        </div>
      )}
<hr></hr>      {voirresultat && Object.keys(voirresultat).length > 0 && (
        <div className='startt'>
          <span className='b'>score:</span>
          <span className='bold'>{voirresultat.points}</span>
        </div>
      )}
      <hr></hr>
      {voirresultat && Object.keys(voirresultat).length > 0 && (
        <div className='startt'>
          <span className='b'>Quiz Result:</span>
          <span style={{ color: "red" }} className='bold'>{voirresultat.achieved}</span>
        </div>
      )}
<hr></hr>
      <div className="restart">
        <button className='btn' onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}

export default VoirResult;