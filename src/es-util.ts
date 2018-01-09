import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");
import assign = require("lodash.assign");
import config = require("config");

const client = new es.Client({
  hosts: [config.get("es.url")],
  connectionClass: awsES
});

const index = config.get("es.index");

export function getDataset(id) {
  const params = {
    index,
    type: "_all",
    id
  };

  return client.get(params).then(result => result._source);
}

export function searchDatasets(searchParams) {
  const params = assign(
    {
      index
    },
    searchParams
  );

  return client
    .search(params)
    .then(result => result.hits.hits.map(hit => hit._source));
}
