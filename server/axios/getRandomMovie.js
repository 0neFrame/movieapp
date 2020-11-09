const express = require("express");
const routerS = express.Router();
const axios = require("axios");

routerS.post("/r", async (req, res) => {
  await axios
    .get(
      `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}`,
      {
        params: {
          i: req.body.i,
        },
      }
    )
    .then((resp) => {
      console.log(`backend post: ${resp.data.Title}, ${resp.data.Year}`);
      console.log(`Response: ${resp.data.Response}`);

      const data = resp.data;
      if (data.Response === "True") return res.status(201).json(data);

      // tt1223334 + forEach
      // tt1223334 += 1
      // tt1111111; tt2222222; tt3333333; tt4444444; filter === "True"
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = routerS;
