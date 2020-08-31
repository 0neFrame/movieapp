import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL_TITLE,
  params: {
    apikey: process.env.VUE_APP_API_KEY,
    // t: inputV,
    // Plot: "full",
  },
});

export default instance;
