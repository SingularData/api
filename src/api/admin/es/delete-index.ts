import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");

AWS.config.region = process.env.AWS_SERVICE_REGION;

export function deleteIndex(req, res) {
  const client = new es.Client({
    hosts: [process.env.ES_URL],
    connectionClass: awsES
  });

  client.indices
    .delete({ index: process.env.ES_INDEX })
    .then(() => res.json({ message: "index deleted" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
}
