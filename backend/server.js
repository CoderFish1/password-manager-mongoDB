const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb"); // import { MongoClient } from 'mongodb'
const bodyParser = require("body-parser");
const cors = require('cors');

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passVault";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());


client.connect(); // Use connect method to connect to the server

// Get a Password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// Save a Password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ sucess: true, result: findResult });
});

// Delete a Password
app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ sucess: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
