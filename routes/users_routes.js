const express = require("express");
const { addUserToDBModel } = require("../db_models");
const router = express.Router();

const {
  isEmailValid,
  passwordsMatch,
  isUsernameValid,
  hashPassword,
  doesUserExist,
  checkPassword,
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

router.post("/login", doesUserExist, checkPassword, async (req, res) => {
  try {
    const { token, user } = req.body;
    res.cookie("token", token, {
      maxAge: 9000000,
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });
    res.send({ id: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
