import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./meditation/server.js";
import cors from "cors";
import bodyparser from "body-parser";
import { v4 as uuid4 } from "uuid";
import pg from "pg";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import env from "dotenv";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(cors());
app.use(cookieParser());
env.config();

const db = new pg.Client({
  host: "pg-3ec2b43c-bindrakartik64-ade0.b.aivencloud.com",
  port: 27548,
  user: "avnadmin",
  password: process.env.DB_PASSWORD,
  database: "defaultdb",
  ssl:{
    rejectUnauthorized: false,
  
  }
});

db.connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/signup", (req, res) => {
  console.log("Signup Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/signup.html");
});
app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const uid = uuid4();
  // try {
  //   await db.query(
  //     `INSERT INTO users (id, name, email, password) VALUES ('${uid}', '${name}', '${email}', '${password}')`
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // res.redirect("/login");
  try{
    const query = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (query.rows.length === 0) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if(err){
          console.log(err);
        }
        else{
          try {
            await db.query(
              `INSERT INTO users (id, name, email, password) VALUES ('${uid}', '${name}', '${email}', '${hash}')`
            );
            // insert dailystreak and coins
            const date = new Date();
            try{
              await db.query(
                `INSERT INTO streaks ( user_id, dailystreak, coins, prevStreakTime) VALUES ('${uid}', 0, 0, '${date.toISOString()}' )`
              );
            }
            catch(e){
              console.log(e);
            }
            res.redirect("/login");
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
    else {
      console.log("User already exists");
      res.redirect("/signup");
    }
  }
  catch(e){
    console.log(e);
  }
});

app.get("/login", (req, res) => {
  console.log("login Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    try {
        const query = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (query.rows.length > 0) {
            const user = query.rows[0];
            const storedPassword = user.password;
            bcrypt.compare(password, storedPassword, (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    if(result){
                        const uid = user.id;
                        res.cookie("uid", uid);
                        res.redirect("/");
                    }
                    else{
                        console.log("Incorrect Password");
                        res.redirect("/login");
                    }
                }
            });
        } else {
            console.log("User does not exist");
            res.redirect("/login");
        }
    } catch (e) {
            console.log(e);
    }
});

app.get("/landing", (req, res) => {
  console.log("landing Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/landing.html");
});

app.get("/", async (req, res) => {
  console.log("Homepage Page Pe aa gya bhai Tu!");
  if(!req.cookies.uid){
    res.redirect("/landing");
  }
  else{
    try{
      const user_id = req.cookies.uid;
      const query = await db.query("SELECT dailystreak FROM streaks WHERE user_id = $1", [user_id]);
      const dailyStreak = query.rows[0].dailystreak;
      res.render(__dirname + "/views/homepage.ejs", {
        dailyStreak: dailyStreak
      });
    }
    catch(e){
      console.log(e);
    }
  }
  
});
app.post("/logout", (req, res) => {
  //delete the user_id cookie and redirect to login page
  res.clearCookie("uid");
  res.redirect("/landing");

});

app.get("/questionnaire", (req, res) => {
  console.log("Questionnaire Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/questionnaire.html");
});
app.post("/questionnaire", async (req, res) => {
    const user_id = req.cookies.uid;
    const mentalWellBeingScore = req.body.mentalWellBeingScore;
    const helpQuotient = req.body.helpQuotient;
    try{
        const query = await db.query(
            `select * from scores where user_id = '${user_id}'`
        );
        if (query.rows.length === 0) {
            try {
                await db.query(
                  `INSERT INTO scores (mentalWellBeing, helpQuotient, user_id) VALUES ('${mentalWellBeingScore}', '${helpQuotient}', '${user_id}')`
                );
              } catch (e) {
                    console.log(e);
              }
        } else {
            try{
                await db.query(
                    `UPDATE scores SET mentalWellBeing = '${mentalWellBeingScore}', helpQuotient = '${helpQuotient}' WHERE user_id = '${user_id}'`
                );
            }
            catch(e){
                console.log(e);
            }
        }
    }
    catch(e){
        console.log(e);
    }
    
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
  res.sendFile(__dirname + "/views/journal.html");
});
async function query1(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/arpanghoshal/EmoRoBERTa",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

app.post("/emotions", async (req, res) => {
  console.log(req.body);
  const user_id = req.cookies.uid;
  const data = req.body.data;
  const title = req.body.title;
  let result = await query1(data);
  const emotion = result[0][0]["label"];
  // res.send(result[0][0]["label"]);
  try{
    await db.query(
        "INSERT INTO journals (title, body, user_id, created_at, emotion) VALUES ($1, $2, $3, $4, $5)", [title, data, user_id, new Date(), emotion]
    );
    res.redirect("/journal");
  }
  catch(e){
    console.log(e);
  }
});

app.post("/getEmotions", async (req, res) => {
  const user_id = req.cookies.uid;
  const emotionMap = new Map();
  try{
    const query = await db.query("SELECT * FROM journals WHERE user_id = $1 order by created_at DESC", [user_id]);
    if(query.rows.length >= 7){
        for(let i = 0; i < 7; i++){
          const emotion = query.rows[i].emotion;
          if(emotionMap.has(emotion)){
            emotionMap.set(emotion, emotionMap.get(emotion) + 1);
          }
          else{
            emotionMap.set(emotion, 1);
          }
        }
        const xValues = Array.from(emotionMap.keys());
        const yValues = Array.from(emotionMap.values());
        res.send({ xValues: xValues, yValues: yValues });
    }
    else{
        res.send({ xValues: [], yValues: [] });
    }
    
  }
  catch(e){
    console.log(e);
  }
});

app.get("/analytics", (req, res) => {
  console.log("Analytics Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/scoreMeters.html");
});
app.post("/analytics", async (req, res) => {
    const user_id = req.cookies.uid;
    try{
        const query = await db.query("SELECT * FROM scores WHERE user_id = $1", [user_id]);
        if(query.rows.length === 0){
            res.json({ mentalWellBeingScore: 0, helpQuotient: 0 });
        }
        else{
          const user = query.rows[0];
          const mentalWellBeingScore = user.mentalwellbeing;
          const helpQuotient = user.helpquotient;
          res.json({ mentalWellBeingScore: mentalWellBeingScore, helpQuotient: helpQuotient });
        }
    }
    catch(e){
        console.log(e);
    }
});

app.get("/dailyChallenges", (req, res) => {
  console.log("challenges Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/gamesDashboard.html");
});

app.get("/dailyChallenges/simonSays", async (req, res) => {

  console.log("simon says Page Pe aa gya bhai Tu!");
  try{
    const user_id = req.cookies.uid;
    const query = await db.query("SELECT dailystreak FROM streaks WHERE user_id = $1", [user_id]);
    const dailyStreak = query.rows[0].dailystreak;
    res.render(__dirname + "/views/simonSays.ejs", {
      dailyStreak: dailyStreak
    });
  }
  catch(e){
    console.log(e);
  }
});
app.post("/dailyChallenges/simonSays", (req, res) => {
  const dailyStreak = req.body.dailyStreak;
  console.log(dailyStreak);
});
app.post("/fetchDate", async (req, res) => {
    const user_id = req.cookies.uid;
    const newDate = new Date();
    
  try{
    const query = await db.query("SELECT prevStreakTime FROM streaks WHERE user_id = $1", [user_id]);
    
    if(query.rows.length === 0){
        try{
            await db.query(
                `INSERT INTO streaks ( user_id, dailystreak, coins, prevStreakTime) VALUES ('${user_id}', 1, 0, '${newDate.toISOString().split("T")[0]}' )`
            );
        }
        catch(e){
            console.log(e);
        }
    }
    else{
        const date = query.rows[0].prevstreaktime;

        console.log(date);
        const diffInDays = Math.floor((newDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if(diffInDays === 1){
            try{
                await db.query(
                    `UPDATE streaks SET dailystreak = dailystreak + 1, prevStreakTime = '${newDate.toISOString()}' WHERE user_id = '${user_id}'`
                );

                // res.json("SUCCESS");
                res.sendStatus(200);
            }
            catch(e){
                console.log(e);
          }
        }
        else{
            try{
                await db.query(
                    `UPDATE streaks SET dailystreak = 1, prevStreakTime = '${newDate.toISOString()}' WHERE user_id = '${user_id}'`
                );
                res.sendStatus(500);
            }
            catch(e){
                console.log(e);
          }
        }
  }
}
  catch(e){
    console.log(e);
  }
});

app.get("/dailyChallenges/wordle", (req, res) => {
  console.log("wordle Page Pe aa gya bhai Tu!");
  res.sendFile(__dirname + "/views/wordle.html");
});

// app.get("/dailyStreak", (req, res) => {
 
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
