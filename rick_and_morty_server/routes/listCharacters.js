const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
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

module.exports = router;
