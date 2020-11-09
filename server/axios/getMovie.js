const express = require("express");
const routerS = express.Router();
const axios = require("axios");

routerS.post("/", async (req, res) => {
  await axios
    .get(
      `${process.env.VUE_APP_API_URL_TITLE}/?apikey=${process.env.VUE_APP_API_KEY}`,
      {
        params: {
          t: req.body.t,
          y: req.body.y,
        },
      }
    )
    .then((resp) => {
      console.log(`backend post: ${resp.data.Title}, ${resp.data.Year}`);
      console.log(`Response: ${resp.data.Response}`);

      const data = resp.data;
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = routerS;
