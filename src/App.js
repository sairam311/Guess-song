import './App.css';
import React, { useState } from 'react';
import LyricDisplay from './components/LyricDisplay';
import GuessInput from './components/GuessInput';
import ResultDisplay from './components/resultDisplay';

function App() {
  const [lyric, setLyric] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateLyricSnippet = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-lyrics');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    //  console.log('generateLyricSnippet data:', data); // Debugging log
      setLyric(data.lyric);
      setResult(null);
    } catch (error) {
    //  console.error('Error fetching lyrics:', error);
      setLyric('Error generating lyric. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuess = async (guess) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/check-guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess, lyric }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
   //   console.log('handleGuess data:', data); // Debugging log
      setResult(data);
    } catch (error) {
    //  console.error('Error checking guess:', error);
      setResult({ correct: false, correctSong: 'Error checking answer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Lyric Match</h1>
      <button onClick={generateLyricSnippet} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Lyrics'}
      </button>
      <LyricDisplay lyric={lyric} />
      <GuessInput onGuess={handleGuess} disabled={loading} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default App;