const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const songs = [
  {
    title: "Chuttamalle Chuttestandhi",
    lyrics: [
        "Endhuku Puttindho Puttindhi",
        "Emo Nuvvante",
        "Mucchatha Puttindhi",
        "Pudataane Nee Pichchi Attindhi",
        "Nee Peru Pettindhi",
        "Vayyaaram Voni Kattindhi",
        "Goranta Pettindhi",
        "Saamiki Mukkulo Kattindhi"
    ]
  },
  {
    title: "Peelings",
    lyrics: [
      "Padukunte Osari Melukunte Osari",
      "Yemi Tosaka Koosunte Osari",
      "Yelu Nokkuthunte Osari Osari",
      "Kalu Tokuthunte Osari Osari",
      "Nuvvu Pakkana Unte Pratokasari"
    ]
  },
  {
    title: "Baby",
    lyrics: [
        "You know you love me (yo), I know you care (uh-huh)",
        "Just shout whenever (yo), and I'll be there (uh-huh)",
        "You are my love (yo), you are my heart (uh-huh)",
        "And we will never, ever, ever be apart (yo, uh-huh)",
        "Are we an item? (Yo) girl, quit playin' (uh-huh)",
        "We're just friends (yo), what are you sayin'? (Uh-huh)"
    ]
  },
  {
    title: "Believer",
    lyrics: [
        "I was broken from a young age",
        "Taking my sulking to the masses",
        "Writing my poems for the few",
        "That look at me, took to me, shook to me, feeling me",
        "Singing from heartache from the pain",
        "Taking my message from the veins",
        "Speaking my lesson from the brain"
    ]
  },
  {
    title: "Nodivalandava",
    lyrics: [
        "Hindi ishq hain",
        "Tamilu kadal",
        "Telugu premava helu",
        "English love you na",
        "Kerala premama",
        "Kannada preethiya helu"
    ]
  },
  {
    title:"Uyi Amma",
    lyrics:[
        "Mucho Mai Akad Ke Taao Bhare",
        "Jab Mojadiya Mein Paav Dhare",
        "Jab Paav Dhare",
        "Aaye Haye Najook Si Maum Ki Moorat Say",
        "Bada Pathhar Dil Bartao Karey",
        "Pathhar Dil Bartao Kare Bartao Karey"
    ]
  },
  {
    title:"Kesariya",
    lyrics:[
        "Rabba ne tujhko banaane mein",
        "Kar di hain husn ki khali tijoriyaan",
        "Kaajal ki siyaahi se likhi",
        "Hain tune jaane kitno ki love storiyan"
    ]
  }
];

app.get('/api/generate-lyrics', (req, res) => {
  try {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const startIndex = Math.floor(Math.random() * (randomSong.lyrics.length - 1));
    const lyric = randomSong.lyrics.slice(startIndex, startIndex + 2).join('\n');
    const correctSong = randomSong.title;

   // console.log('Lyrics generated:', { lyric, correctSong }); // Added logging

    res.json({ lyric, correctSong });
  } catch (error) {
  //  console.error('Error in generate-lyrics:', error); // Added logging
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
});

app.post('/api/check-guess', (req, res) => {
  const { guess, lyric } = req.body;
 // console.log('check-guess endpoint hit');
  try {
    const song = songs.find(s => s.lyrics.slice(s.lyrics.indexOf(lyric.split('\n')[0]), s.lyrics.indexOf(lyric.split('\n')[0]) + 2).join('\n') === lyric);

    if (!song) {
    //  console.error('song not found for lyrics:', lyric);
      return res.status(404).json({ error: 'Song not found for given lyrics' });
    }

    const correct = guess.toLowerCase().trim() === song.title.toLowerCase().trim();
   // console.log('Check guess result:', { correct, correctSong: song.title }); // Added logging
    res.json({ correct, correctSong: song.title });
  } catch (error) {
  //  console.error('Error in check-guess:', error); // Added logging
    res.status(500).json({ error: 'Failed to check guess' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});