module.exports = app => {
  const authController = require("../controllers/auth.controller.js");

  const router = require("express").Router();

  router.post("/login", authController.login);
  router.post("/register", authController.register);


  app.use('/auth', router);
};
