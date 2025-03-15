import React, { useState } from 'react';

function GuessInput({ onGuess, disabled }) {
  const [guess, setGuess] = useState('');

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = () => {
    onGuess(guess);
    setGuess('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Added event handler
        disabled={disabled}
      />
      <button onClick={handleSubmit} disabled={disabled}>
        Check Answer
      </button>
    </div>
  );
}

export default GuessInput;