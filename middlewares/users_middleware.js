const bcrypt = require("bcrypt");
const { getUserByEmailModel, getUserByUsernameModel } = require("../db_models");

async function isEmailValid(req, res, next) {
  try {
    const result = await getUserByEmailModel(req.body.email);
    if (result.error) throw result.error;
    if (result.length) throw new Error("Email is already in use");
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

async function isUsernameValid(req, res, next) {
  try {
    const result = await getUserByUsernameModel(req.body.username);
    if (result.error) throw result.error;
    if (result.length) throw new Error("Username is already in use");
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
async function hashPassword(req, res, next) {
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(req.body.password, saltRounds);

    if (!hashed) throw new Error("Bcrypt error");
    req.body.password = hashed;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function doesUserExist(req, res, next) {
  try {
    const user = await getUserByEmailModel(req.body.email);
    if (!user.length) throw new Error("Email not found");
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

async function checkPassword(req, res, next) {
  try {
    const matched = await bcrypt.compare(req.body.password, req.user.password);
    if (!matched) throw new Error("Wrong Password");
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

function passwordsMatch(req, res, next) {
  if (req.body.password !== req.body.repassword) {
    res.status(400).send("Passwords don't match");
    return;
  }
  next();
}

module.exports = {
  isEmailValid,
  isUsernameValid,
  passwordsMatch,
  hashPassword,
  doesUserExist,
  checkPassword,
};
