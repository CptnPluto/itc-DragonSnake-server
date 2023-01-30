const express = require("express");
const { addScoreToDBModel } = require("../db_models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const response = await addScoreToDBModel(req.body);
    console.log(response);
    if (response?.error) throw response.error;
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
