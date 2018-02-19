import * as express from "express";
import serverless = require("serverless-http");
import datasets = require("./datasets");
import admin = require("./admin");
import bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/api/datasets/search", datasets.searchDatasets);
app.get("/api/datasets/:id/dcat", datasets.getDatasetDCAT);
app.get("/api/datasets/:id/metadata", datasets.getDatasetMetadata);
app.get("/api/datasets/:id", datasets.getDataset);

app.post("/api/admin/es/index", admin.createIndex);
app.post("/api/admin/pipeline/bootstrap", admin.bootstrapPipeline);
app.delete("/api/admin/es/index", admin.deleteIndex);

app.use((req, res) => res.send(404));

module.exports.handler = serverless(app);
