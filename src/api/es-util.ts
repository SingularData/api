import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");
import assign = require("lodash.assign");
import * as _ from "lodash";

AWS.config.region = process.env.AWS_REGION;

const client = new es.Client({
  hosts: [process.env.ES_URL],
  connectionClass: awsES
});

export function getDataset(id) {
  const params = {
    index: process.env.ES_INDEX,
    type: "_all",
    id
  };

  return client.get(params).then(result => result._source);
}

export function searchDatasets(searchParams) {
  const params = _.defaults(
    {
      index: process.env.ES_INDEX
    },
    searchParams
  );

  return client
    .search(params)
    .then(result => result.hits.hits.map(hit => hit._source));
}
