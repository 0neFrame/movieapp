const express = require("express");
const routerS = express.Router();
const axios = require("axios");

// axios.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

routerS.post("/del", async (req, res) => {
  await axios
    .get(`${process.env.MONGO_DATABASE}/movies`)
    .then((resp) => {
      console.log(`DB get: ${resp}`);
      // console.log(`Response: ${resp.data.Response}`);

      // const data = resp.data;
      // if (data.Response === "True") return res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const _id = 0;
routerS.delete(`/${_id}`);

module.exports = routerS;
