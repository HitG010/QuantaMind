import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./meditation/server.js";
import cors from 'cors';
import bodyparser from 'body-parser';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, collection, query, where, onSnapshot } from 'firebase/firestore';
import { addDoc, updateDoc } from 'firebase/firestore';
import jwt from 'jsonwebtoken';



const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "Public")));
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
let userId="";
let dailyStreak = 0;
const authMiddleware = (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in');
      userId = user.uid;
      next();
    } else {
      console.log('No user is signed in');
      res.redirect('/landing');
    }
  });
};

// var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//make a middleware to verify the user token from the loclal storage once the user lands on the home page
const verifyToken = (req, res, next) => {
  console.log(req);
  // read request headers for auth token
  const token = req.headers['x-access-token'];
  console.log('token:', token);

  if(token){
    jwt.verify(token, 'shhhhh', function(err, decoded) {
      console.log(decoded);
      if(err){
        res.redirect('/login');
      } else {
        // req.userId = decoded.uid;
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// const checkStreak = (req, res, next) => {
//   const queryRef = query(usersCollection, where('uid', '==', userId));
//   onSnapshot(queryRef, (querySnapshot) => {
//       const firstDoc = querySnapshot.docs[0];
//       if(firstDoc) {
//           dailyStreak = firstDoc.data().dailyStreak;
//       }
//   });
//   next();
// };

const db = getFirestore();
const usersCollection = collection(db, 'users');

app.get('/signup', (req, res) => {
  console.log('Signup Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/signup.html');
});
app.post('/signup', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User signed up:', user);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const uid = user.uid;
    const newUser = {
      name: name,
      email: email,
      password: password,
      uid: uid,
      mentalWellBeingScore: 0,
      helpQuotient: 0,
      dailyStreak: 0,
      isSimonSaysPlayed: false,
      isWordlePlayed: false
    };

    addDoc(usersCollection, newUser)
      .then(() => {
        console.log('User added to the database');
        res.redirect('/');
      })
      .catch((error) => {
        console.log('Error adding user to the database:', error);
        res.redirect('/signup');
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error signing up:', errorCode, errorMessage);
    res.redirect('/signup');
  });
});


app.get('/login', (req, res) => {
  console.log('login Page Pe aa gya bhai Tu!');
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      let token = jwt.sign({ user: user}, 'shhhhh');
      res.json({token: token});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error signing in:', errorCode, errorMessage);
      res.redirect('/login');
    });
});

// const cache = {};
// userId: dailyStreak

app.get("/landing", (req, res) => {
  console.log("landing Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/landing.html");
});

app.get("/", authMiddleware, (req, res) => {
  const queryRef = query(usersCollection, where('uid', '==', userId));

  onSnapshot(queryRef, (querySnapshot) => {
      const firstDoc = querySnapshot.docs[0];

        dailyStreak = firstDoc.data().dailyStreak;
        
      });
      
      console.log("Home Page Pe aa gya bhai Tu!", dailyStreak);
      res.render(__dirname + "/views/homepage.ejs", {dailyStreak: dailyStreak});
});
app.post("/", (req, res) => {
  res.send({dailyStreak: dailyStreak});
});


app.get("/questionnaire", (req, res) => {
  console.log("Questionnaire Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/questionnaire.html");
});
app.post("/questionnaire", (req, res) => {
  console.log(userId);
  const mentalWellBeingScore = req.body.mentalWellBeingScore;
  const helpQuotient = req.body.helpQuotient;

  const queryRef = query(usersCollection, where('uid', '==', userId));
  onSnapshot(queryRef, (querySnapshot) => {
      const firstDoc = querySnapshot.docs[0];
      if(firstDoc) {
          updateDoc(firstDoc.ref, dataToUpdate)
            .then(() => {
              console.log('Data updated successfully in Firestore');
              res.redirect('/');
            })
            .catch((error) => {
              console.log('Error updating data in Firestore:', error);
            });
      }
  });
  const dataToUpdate = {
    mentalWellBeingScore: mentalWellBeingScore,
    helpQuotient: helpQuotient
  };
});

app.get("/resources", (req, res) => {
  console.log("Resources Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/resources.html");
});

app.get("/resources/quotes", (req, res) => {
  console.log("quotes Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/quotes.html");
});
app.get("/resources/articles", (req, res) => {
  console.log("articles Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/articles.html");
});
app.get("/resources/music", (req, res) => {
  console.log("music Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/music.html");
});

app.use("/meditate", router);

app.get("/journal", (req, res) => {
  console.log("Journal Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/journal/templates/index.html");
});

app.get("/analytics", (req, res) => {
  console.log("Analytics Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/scoreMeters.html");
});
app.post("/analytics", (req, res) => {
  const queryRef = query(usersCollection, where('uid', '==', userId));
  onSnapshot(queryRef, (querySnapshot) => {
      const firstDoc = querySnapshot.docs[0];
      if(firstDoc) {
        console.log(firstDoc.data());
          res.send({mentalWellBeingScore: firstDoc.data().mentalWellBeingScore, helpQuotient: firstDoc.data().helpQuotient});
      }
  });
});

app.get("/dailyChallenges", (req, res) => {
  console.log("challenges Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/gamesDashboard.html");
});

app.get("/dailyChallenges/simonSays", (req, res) => {
  let isSimonSaysPlayed = false;
const queryRef = query(usersCollection, where('uid', '==', userId));
onSnapshot(queryRef, (querySnapshot) => {
    const firstDoc = querySnapshot.docs[0];
    if(firstDoc) {
        dailyStreak = firstDoc.data().dailyStreak;
        isSimonSaysPlayed = firstDoc.data().isSimonSaysPlayed;
    }
});
  
  console.log("simon says Page Pe aa gya bhai Tu!");
  res.render(__dirname + "/views/simonSays.ejs", {dailyStreak: dailyStreak, isSimonSaysPlayed: isSimonSaysPlayed});
});
app.post("/dailyChallenges/simonSays", (req, res) => {
  dailyStreak = parseInt(req.body.dailyStreak);
  const isSimonSaysPlayed = req.body.isSimonSaysPlayed;
  console.log(dailyStreak);
  const queryRef = query(usersCollection, where('uid', '==', userId));
  onSnapshot(queryRef, (querySnapshot) => {
      const firstDoc = querySnapshot.docs[0];
      if(firstDoc) {
          updateDoc(firstDoc.ref, {dailyStreak: dailyStreak, isSimonSaysPlayed: isSimonSaysPlayed})
            .then(() => {
              console.log('Data updated successfully in Firestore');
            })
            .catch((error) => {
              console.log('Error updating data in Firestore:', error);
            });
      }
  });
});

app.get("/dailyChallenges/wordle", (req, res) => {
  console.log("simon says Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/wordle.html");
});

app.get("/dailyStreak", verifyToken, (req, res) => {
  const queryRef = query(usersCollection, where('uid', '==', userId));
  onSnapshot(queryRef, (querySnapshot) => {
      const firstDoc = querySnapshot.docs[0];
      if(firstDoc) {
          dailyStreak = firstDoc.data().dailyStreak;
      }
  });
  res.json({dailyStreak: dailyStreak});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
