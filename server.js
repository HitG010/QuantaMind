import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {router} from './meditation/server.js';

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    console.log('Home Page Pe aa gya bhai Tu!');
    res.sendFile(__dirname + '/views/homepage.html');
});

app.get('/questionnaire', (req, res) => {
    console.log('Questionnaire Page Pe aa gya bhai Tu!');
    res.sendFile(__dirname + '/views/questionnaire.html');
});

app.get('/resources', (req, res) => {
  console.log('Resources Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/resources.html');
});

app.use('/meditate', router);

app.get('/journal', (req, res) => {
  console.log('Journal Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/journal.html');
});

app.get('/analytics', (req, res) => {
  console.log('Scores Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/scoreMeters.html');
});

app.get('/dailyChallenges', (req, res) => {
  console.log('challenges Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/dailyChallenges.html');
});

app.get('/dailyChallenges/simonSays', (req, res) => {
  console.log('simon says Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/simonSays.html');
});

app.get('/dailyChallenges/wordle', (req, res) => {
  console.log('simon says Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/wordle.html');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});