import express, { Router } from "express";
import serverless from "serverless-http";
const fs = require('fs');

const app = express();
const router = Router();

router.get("/", async(req, res) => {
  var response = await fetch('https://62e2956eb54fc209b87c5f94.mockapi.io/nexus/smartcity-database/1');
  var raw_data = await response.text();
  var data = JSON.parse(raw_data)
  res.status(200).json(data);
});

app.use(`/.netlify/functions/get`, router);

export default app;
export const handler = serverless(app);