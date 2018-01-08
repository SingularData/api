import serverless = require("serverless-http");
import express = require("express");

import { getDataset } from "./handler/get-dataset";
import { searchDatasets } from "./handler/search-datasets";

const app = express();

app.get("/api", (req, res) => res.json({ version: process.env.VERSION }));
app.get("/api/datasets/:id", getDataset);
app.get("/api/datasets/search", (req, res) => searchDatasets);

app.use((req, res) => res.send(404));

module.exports.handler = serverless(app);
