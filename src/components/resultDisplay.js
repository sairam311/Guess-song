import React from 'react';

function ResultDisplay({ result }) {
 // console.log('ResultDisplay received:', result); // Debugging log
  if (!result) {
    return null;
  }

  return (
    <div>
      {result && result.correct ? <p>Correct!</p> : <p>Incorrect. The correct song is: {result && result.correctSong}.</p>}
    </div>
  );
}

export default ResultDisplay;