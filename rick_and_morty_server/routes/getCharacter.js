const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const character_id = parseInt(req.query.id);
    if (!Number.isInteger(character_id) || isNaN(character_id)) {
      res.status(400).json({ error: 'Invalid ID: ID must be an integer' });
    }
    const response = await axios.get(
      `${process.env.RICK_AND_MORTY_BASE_URL}/api/character/${character_id}`
    );

    const apiData = response.data;
    const { id, name, status, species, type, gender, origin, location, image } = apiData;
    const transformedData = {
      id,
      name,
      status,
      species,
      type,
      gender,
      origin: origin.name,
      location: location.name,
      image,
    };


    res.json(transformedData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occrured.");
  }
});

module.exports = router;
