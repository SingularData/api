import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");
import assign = require("lodash.assign");
import * as _ from "lodash";

AWS.config.region = process.env.AWS_SERVICE_REGION;

const client = new es.Client({
  hosts: [process.env.ES_URL],
  connectionClass: awsES
});

export function getDataset(id) {
  const params = {
    id
  };

  return getData(params);
}

export function getDatasetDCAT(id) {
  const params = {
    id,
    _sourceInclude: ["dcat"]
  };

  return getData(params).then(result => result.dcat);
}

export function getDatasetMetadata(id) {
  const params = {
    id,
    _sourceInclude: ["original"]
  };

  return getData(params).then(result => result.original);
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

function getData(params) {
  params = _.defaults(params, {
    index: process.env.ES_INDEX,
    type: process.env.ES_DOC_TYPE
  });

  return client.get(params).then(result => result._source);
}
