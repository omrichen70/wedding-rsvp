const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

const guestSchema = new mongoose.Schema({
  fullName: String,
  numberOfPeople: Number,
  needsRide: Boolean,
});

const Guest = mongoose.model("Guest", guestSchema);

app.post("/rsvp", async (req, res) => {
  // create a new guest instance
  const newGuest = new Guest({
    fullName: req.body.fullName,
    numberOfPeople: req.body.numberOfPeople,
    needsRide: req.body.needsRide,
  });

  // use async/await to handle the promise returned by save()
  try {
    const savedGuest = await newGuest.save();
    console.log("saved guest:", savedGuest);
    res.status(200).json(savedGuest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is running!");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
