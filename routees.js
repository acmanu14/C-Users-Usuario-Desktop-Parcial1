"use strict"

var express = require("express");
var authController = requite("../controller/athentication");
var token = require("./helpers/token");
const { registerUsers } = require("./controllers/authentication");
var application = express.Router();

application.post("/users", authController.registerUsers);
application.post("/login", authController.logIn);

module. exports = application;


