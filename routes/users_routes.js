const express = require("express");
const router = express.Router();

const {
  isEmailValid,
  passwordsMatch,
  isUsernameValid,
} = require("../middlewares/users_middleware");

router.post(
  "/signup",
  //   passwordsMatch,
  isUsernameValid,
  isEmailValid,
  async (req, res) => {
    try {
      res.send("sign up");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
