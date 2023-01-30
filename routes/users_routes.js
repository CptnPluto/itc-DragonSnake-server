const express = require("express");
const { addUserToDBModel } = require("../db_models");
const router = express.Router();

const {
  isEmailValid,
  passwordsMatch,
  isUsernameValid,
  hashPassword,
} = require("../middlewares/users_middleware");

router.post(
  "/signup",
  passwordsMatch,
  isUsernameValid,
  isEmailValid,
  hashPassword,
  async (req, res) => {
    try {
      await addUserToDBModel(req.body);
      res.send({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

module.exports = router;
