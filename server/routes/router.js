const express = require("express");
const route = express.Router();
const { body, validationResult } = require('express-validator');
const { registerValidator } = require('../utils/validators');

const services = require("../sevices/render");
const controller = require("../controller/controller");


route.get("/", services.home);
route.get("/add_user", services.add_user);
route.get("/update_user", services.update_user);
route.get("/view_user", services.view_user);
route.get("/about", services.aboutus);

// API
route.post("/api/users", registerValidator, controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
