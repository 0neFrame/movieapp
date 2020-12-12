const tls = require("tls");
const fs = require("fs");

const port = 3443;
const host = "127.0.0.1";

const options = {
  key: fs.readFileSync("./server/tls/r-key.pem"),
  ca: fs.readFileSync("./server/tls/r-csr.pem"),
  cert: fs.readFileSync("./server/tls/r-cert.pem"),
  requestCert: true,
  rejectUnauthorized: true
};

tls
  .createServer(options, s => {
    console.log("create TLS server:", host, port);
    console.log(
      "server connected",
      s.authorized ? "authorized" : "unauthorized"
    );
    s.write("welcome!\n");
    s.setEncoding("utf8");
    s.pipe(s);
  })
  .listen(port, host, () => {
    console.log("TLS server bound:", host, port);
  });
