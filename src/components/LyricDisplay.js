import React from 'react';

function LyricDisplay({ lyric }) {
  return <div>{lyric ? <p style={{ whiteSpace: 'pre-line' }}>{lyric}</p> : <p>Click "Generate Lyrics" to start.</p>}</div>;
}

export default LyricDisplay;