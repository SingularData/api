import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");
import { readFileSync } from "fs";
import { join } from "path";

const mappings = JSON.parse(
  readFileSync(join(__dirname, "mappings.json"), "utf-8")
);

AWS.config.region = "us-east-1";

export function createIndex(req, res) {
  const client = new es.Client({
    hosts: [process.env.ES_URL],
    connectionClass: awsES
  });

  const docMapping = {};
  docMapping[process.env.ES_DOC_TYPE] = mappings;

  client.indices
    .create({
      index: process.env.ES_INDEX,
      body: {
        mappings: docMapping
      }
    })
    .then(() => res.json({ message: "index created" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
}
