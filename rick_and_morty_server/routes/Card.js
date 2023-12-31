const express = require("express");
const router = express.Router();
const axios = require("axios");
const { json } = require("body-parser");

router.get("/list_characters", async (req, res) => {
  try {
    const { status, gender, species, name, page } = req.query;

    const queryParams = new URLSearchParams({
      name,
      page,
      status,
      gender,
      species,
    });
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?${queryParams.toString()}`
    );

    const apiData = response.data;

    const { info, results } = apiData;

    const modifiedResults = results.map(({ id, name, image, species }) => ({
      id,
      name,
      image,
      species,
    }));

    const responseObject = {
      pages: info.pages,
      results: modifiedResults,
      curr_page: page
    };

    res.json(responseObject);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occrured.");
  }
});

router.get("/get_character", async (req, res) => {
  try {
    const character_id = parseInt(req.query.id);
    if (!Number.isInteger(character_id) || isNaN(character_id)) {
      res.status(400).json({ error: 'Invalid ID: ID must be an integer' });
    }
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${character_id}`
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
