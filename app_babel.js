import express from "express";
//let router = require("./BABEL_SCRIPTS/routes.js").default;
import router from "./BABEL_SCRIPTS/routes.js";
import bodyParser from "body-parser";
import pug from "pug";
import path from "path";
const server = express();

server.engine("html", pug.renderFile);
server.set('view engine', 'html');
//server.set("views", `../WWW`);
server.use(express.static("./"), express.static('WWW/pages'));
//server.set("views", "../WWW/pages");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/", router);
server.use("/bootstrap", express.static(path.resolve("node_modules/bootstrap")));
server.listen(3000);
