const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('mynewsdb');
    const articles = database.collection('articles');

    app.get('/articles', async (req, res) => {
      const cursor = articles.find({});
      const results = await cursor.toArray();
      res.json(results);
    });

    app.post('/articles', async (req, res) => {
      const article = req.body;
      const result = await articles.insertOne(article);
      res.json(result);
    });

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
