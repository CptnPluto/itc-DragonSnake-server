const express = require("express");
const router = express.Router();
const { addUserToDBModel, getUserByIdModel } = require("../db_models");

const {
  isEmailValid,
  passwordsMatch,
  isUsernameValid,
  hashPassword,
  doesUserExist,
  checkPassword,
  verifyToken,
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
      res.status(500).send({ error: error.message });
    }
  }
);

router.post("/login", doesUserExist, checkPassword, async (req, res) => {
  try {
    const { token, user } = req.body;
    res.cookie("token", token, {
      maxAge: 9000000,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.send({ id: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const response = await getUserByIdModel(req.body.id);
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
