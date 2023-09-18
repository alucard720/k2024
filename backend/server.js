const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Canditatos = require("./models/candidato.user");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const dbUri = process.env.DB0_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/candidatos-list", async (req, res) => {
  const candidatos = await Canditatos.find();
  if (candidatos.length > 0) {
    res.send(candidatos);
  } else ({ result: " no candidatos found" });
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const data = await Canditatos.find({
      Nombres: { $regex: query, $options: "1" },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal Error Server" });
  }
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mongo connection established");
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});