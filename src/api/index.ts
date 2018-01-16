import serverless = require("serverless-http");
import express = require("express");
import config = require("config");
import datasets = require("./datasets");
import admin = require("./admin");
import bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => res.json({ version: config.get("version") }));

app.get("/api/datasets/search", datasets.searchDatasets);
app.get("/api/datasets/:id", datasets.getDataset);

app.post("/api/admin/bootstrap_pipeline", admin.bootstrapPipeline);

app.use((req, res) => res.send(404));

module.exports.handler = serverless(app);
