const { getUserByEmailModel } = require("../db_models");

async function isEmailValid(req, res, next) {
  try {
    const result = await getUserByEmailModel(req.body.email);
    if (result.error) throw result.error;
    if (result.length) throw new Error("Email already in use");
    next();
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { isEmailValid };
