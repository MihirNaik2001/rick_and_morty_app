const express = require("express");
const listCharactersRouter = require("./routes/listCharacters");
const getCharacterRouter = require("./routes/getCharacter");

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/list_characters", listCharactersRouter);
app.use("/get_character", getCharacterRouter);

app.listen(port, () => {
  console.log(`Rick and Morty backend listening on port ${port}`);
});