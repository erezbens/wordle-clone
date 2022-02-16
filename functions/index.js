const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
require("dotenv").config();

const app = express();
app.use(cors());

// app.listen(PORT, () => console.log("Server running on port " + PORT));

app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5", wordLength: "5", excludes: " " },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/check", (req, res) => {
  // console.log(req.query.word);

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
      // console.log(response.data);
      res.json(response.data.result_msg);
    })
    .catch((error) => {
      console.error(error);
    });
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.region("europe-west1").https.onRequest(app);
