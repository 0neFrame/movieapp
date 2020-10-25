const mongoose = require("mongoose");
const dotenv = require("dotenv");
const appS = require("./index");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!!! Bye-bye!");
  console.log(err.name, err.msg);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const DB = process.env.MONGO_DATABASE.replace(
  "<PASSWORD>",
  process.env.MONGO_DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connetion successful!");
  });

const port = process.env.PORT || 3333;
const server = appS.listen(port, () => {
  console.log(`App running on...port ${port}...Zzzz...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.msg);
  console.log("UNHANDLED REJECTION!!! Bye-bye!");
  server.close(() => {
    process.exit(1);
  });
});
