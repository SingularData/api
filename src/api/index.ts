import serverless = require("serverless-http");
import express = require("express");
import config = require("config");
import datasets = require("./datasets");
import admin = require("./admin");
import bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/api/datasets/search", datasets.searchDatasets);
app.get("/api/datasets/:id", datasets.getDataset);

app.post("/api/admin/es/index", admin.createIndex);
app.delete("/api/admin/es/index", admin.deleteIndex);
app.post("/api/admin/pipeline/bootstrap", admin.bootstrapPipeline);

app.use((req, res) => res.send(404));

module.exports.handler = serverless(app);
