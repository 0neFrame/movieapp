const express = require("express");
const routerS = express.Router();
const axios = require("axios");

routerS.post("/r", async (req, res) => {
  await axios
    .get(
      `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}`,
      {
        params: {
          i: req.body.i
        }
      }
    )
    .then(resp => {
      console.log(`backend post: ${resp.data.Title}, ${resp.data.Year}`);
      res.status(201).json(resp.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = routerS;
