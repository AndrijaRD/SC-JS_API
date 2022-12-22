import express, { Router } from "express";
import serverless from "serverless-http";
const fs = require('fs');

const app = express();
const router = Router();

router.get("/", (req, res) => {
  res.send('src');
});

app.use(``, router);

export default app;
export const handler = serverless(app);