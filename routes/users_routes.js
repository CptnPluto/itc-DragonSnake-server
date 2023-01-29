const express = require("express");
const router = express.Router();

const { isEmailValid } = require("../middlewares/users_middleware");

router.post("/signup", isEmailValid, async (req, res) => {});
