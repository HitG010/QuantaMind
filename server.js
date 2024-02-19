import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {router} from './meditation/server.js';
import cors from 'cors';
import bodyparser from 'body-parser';
import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where } from 'firebase/firestore';


const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const firebaseConfig = {
  apiKey: "AIzaSyDRXUMZcaC6XpxIBxKHtEG9FNswYmQcUXo",
  authDomain: "gdsc-quantamind.firebaseapp.com",
  projectId: "gdsc-quantamind",
  storageBucket: "gdsc-quantamind.appspot.com",
  messagingSenderId: "602609425810",
  appId: "1:602609425810:web:b8562f26dd0597f60eb54b",
  measurementId: "G-F4H6ZNZ4RD"
};

initializeApp(firebaseConfig);
const auth = getAuth();

const authMiddleware = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in');
      next();
    } else {
      console.log('No user is signed in');
      res.redirect('/login');
    }
  });
};

const db = getFirestore();
const usersCollection = collection(db, 'users');

// const userExistsMiddleware = (req, res, next) => {
//   const userId = req.user.uid; // Assuming you have the user ID available in the request object
//   const userRef = doc(db, 'users', userId);

//   getDoc(userRef)
//     .then((docSnapshot) => {
//       if (docSnapshot.exists()) {
//         console.log('User exists in the Firestore database');
//         res.redirect('/');
//         next();
//       } else {
//         console.log('User does not exist in the Firestore database');
//         res.redirect('/signup');
//       }
//     })
//     .catch((error) => {
//       console.log('Error checking user existence:', error);
//       res.redirect('/login');
//     });
// };

// app.use(userExistsMiddleware);



app.get('/signup', (req, res) => {
  console.log('Signup Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/signup.html');
});

app.get('/login', (req, res) => {
  console.log('login Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  try {
    // const userRef = doc(db, 'users', email);
    // const userSnapshot = await getDoc(userRef);
    const userSnapshot = query(usersCollection, where("email", "==" , email));
    console.log(userSnapshot);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (userData.password === password) {
        console.log('User authorized');
        // Continue with the login process
      } else {
        console.log('Invalid password');
        // Handle invalid password case
      }
    } else {
      console.log('User not found');
      // Handle user not found case
    }
  } catch (error) {
    console.log('Error checking user existence:', error);
    // Handle error case
  }
  
});

app.get('/landing', (req, res) => {
  console.log('Landing Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/landing.html');
});

app.get('/', authMiddleware, (req, res) => {
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

app.get('/resources/quotes', (req, res) => {
  console.log('Resources Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/quotes.html');
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
  res.sendFile(__dirname + '/views/gamesDashboard.html');
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