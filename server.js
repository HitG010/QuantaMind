import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./meditation/server.js";
import cors from 'cors';
import bodyparser from 'body-parser';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where } from 'firebase/firestore';
import { addDoc, updateDoc } from 'firebase/firestore';


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
let userId;
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
      uid: uid
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
      res.redirect('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error signing in:', errorCode, errorMessage);
      res.redirect('/login');
    });
});

app.get("/landing", (req, res) => {
  console.log("landing Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/landing.html");
});

app.get("/", authMiddleware, (req, res) => {
  console.log("Home Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/homepage.html");
});

app.get("/questionnaire", (req, res) => {
  console.log("Questionnaire Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/questionnaire.html");
});
app.post("/questionnaire", (req, res) => {
  const mentalWellBeingScore = req.body.mentalWellBeingScore;
  const helpQuotient = req.body.helpQuotient;
  // const userRef = doc(db, 'users', userId);
  const UpdateQuery = query(collection(db, "users"), where("uid", "==", userId));
  const dataToUpdate = {
    mentalWellBeingScore: mentalWellBeingScore,
    helpQuotient: helpQuotient
  };

  updateDoc(userRef, dataToUpdate)
    .then(() => {
      console.log('Data updated successfully in Firestore');
      // res.redirect('/');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error updating data in Firestore:', error);
      // res.redirect('/questionnaire');
      res.sendStatus(500);
    });

  
});

app.get("/resources", (req, res) => {
  console.log("Resources Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/resources.html");
});

app.get("/resources/quotes", (req, res) => {
  console.log("quotes Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/quotes.html");
});

app.use("/meditate", router);

app.get("/journal", (req, res) => {
  console.log("Journal Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/journal/templates/index.html");
});

app.get("/analytics", (req, res) => {
  console.log("Scores Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/scoreMeters.html");
});

app.get("/dailyChallenges", (req, res) => {
  console.log("challenges Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/gamesDashboard.html");
});

app.get("/dailyChallenges/simonSays", (req, res) => {
  console.log("simon says Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/simonSays.html");
});

app.get("/dailyChallenges/wordle", (req, res) => {
  console.log("simon says Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/wordle.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
