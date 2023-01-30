const express = require("express");
const {
  addScoreToDBModel,
  getAllScoresModel,
  getScoresByIdModel,
  getHighScoreModel,
  getLatestScoreModel,
} = require("../db_models");
const { verifyToken } = require("../middlewares/users_middleware");
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

router.get("/", verifyToken, async (req, res) => {
  try {
    const response = await getAllScoresModel();
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const response = await getScoresByIdModel(req.params.id);
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/high/:id", verifyToken, async (req, res) => {
  try {
    const response = await getHighScoreModel(req.params.id);
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.get("/latest/:id", verifyToken, async (req, res) => {
  try {
    const response = await getLatestScoreModel(req.params.id);
    if (response.error) throw response.error;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
