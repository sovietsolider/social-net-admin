const express = require("express");
const router = require("./BACKEND/routes.js");
const bodyParser = require("body-parser");
const pug = require("pug");
const path = require("path");

const https = require("https");
global.build_dir = "BUILD_GULP";
const fs = require("fs");
const private_key = fs.readFileSync("ssl_lab3.key", "utf8");
const certificate = fs.readFileSync("ssl_lab3.csr", "utf8");

const cors = require('cors');
const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}
const server = express();

server.engine("html", pug.renderFile);
server.set('view engine', 'html');
server.use(cors(corsOptions));

//server.use(multer({dest:"uploads"}).single("filedata"));
server.use("/css", express.static(global.build_dir + "/CSS"));
server.use("/bootstrap", express.static("bootstrap"));
server.use("/jquery", express.static("jquery"));
server.use("/js", express.static(global.build_dir + "/JS"));
server.use("/user/js", express.static(global.build_dir + "/JS"));
server.use("/images", express.static("upload"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use("/", router);
server.use("/bootstrap", express.static(path.resolve("node_modules/bootstrap")))



const httpsServer = https.createServer({key: private_key, cert: certificate}, server);
httpsServer.listen(3000);