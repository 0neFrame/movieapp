const mongoose = require("mongoose");
const dotenv = require("dotenv");
const appS = require("./index");

const tls_server = require("../server/tls/tls_server");
// const tls = require("tls");
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("./server/tls/r-key.pem"),
  ca: fs.readFileSync("./server/tls/r-csr.pem"),
  cert: fs.readFileSync("./server/tls/r-cert.pem"),
  requestCert: false,
  rejectUnauthorized: false,
};

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!!! Bye-bye!");
  console.log(/*err.name, err.msg,*/ err);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const DB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connetion successful!");
  });

const host = "127.0.0.1";
const port = process.env.PORT || 3333;
const server = appS.listen(port, () => {
  console.log(`App running on...port ${port}...Zzzz...`);
});

https.createServer(options, appS).listen(port, host, function() {
  console.log(`HTTPS-Server listens https://${host}:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION!!! Bye-bye!");
  server.close(() => {
    process.exit(1);
  });
});
