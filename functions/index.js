const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
require("dotenv").config();
const words = require("./words");

const app = express();
app.use(cors());

// app.listen(PORT, () => console.log("Server running on port " + PORT));

app.get("/word", (req, res) => {
  console.log("hi");
  // const options = {
  //   method: "GET",
  //   url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
  //   params: { count: "5", wordLength: "5", excludes: " " },
  //   headers: {
  //     "x-rapidapi-host": "random-words5.p.rapidapi.com",
  //     "x-rapidapi-key": process.env.RAPID_API_KEY,
  //   },
  // };

  // axios
  //   .request(options)
  //   .then((response) => {
  //     res.json(response.data[0]);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const randomWord = words[Math.floor(Math.random() * words.length)];

  return Promise.resolve(randomWord);
  // return res.json(Promise.resolve(randomWord));
  // return res.json(randomWord);
});

app.get("/check", (req, res) => {
  const options = {
    method: "GET",
    url: "https://twinword-word-graph-dictionary.p.rapidapi.com/association/",
    params: { entry: req.query.word },
    headers: {
      "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.result_msg);
    })
    .catch((error) => {
      console.error(error);
    });
});

exports.app = functions.region("europe-west1").https.onRequest(app);
