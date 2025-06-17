const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const GEMINI_API_KEY = 'AIzaSyArGQWyjAH5jUvgisDIj4NX60iJuHZsWcU'; // <--- GANTI ini

app.get('/', (req, res) => {
  res.render('index', { question: null, answer: null });
});

app.post('/ask', async (req, res) => {
  const userQuestion = req.body.question;

  try {
const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [{ text: userQuestion }]
      }
    ]
  }
);

    const answer = response.data.candidates[0].content.parts[0].text;
    res.render('index', { question: userQuestion, answer: answer });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.render('index', {
      question: userQuestion,
      answer: "Terjadi kesalahan saat menghubungi Gemini API."
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
