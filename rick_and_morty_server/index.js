const express = require("express");

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/Card.js"));

app.listen(port, () => {
  console.log(`Rick and Morty backend listening on port ${port}`);
});