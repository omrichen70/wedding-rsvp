const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://omrichen70:yanisCh7052@guests.nakrebp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
    console.log("saved");
    res.json(savedGuest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
