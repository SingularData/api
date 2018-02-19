import fetch from "node-fetch";
import { expect } from "chai";
import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");

AWS.config.region = process.env.AWS_SERVICE_REGION;

const url = `http://${process.env.TEST_HOST}:${process.env.TEST_PORT}`;
const index = process.env.ES_INDEX;
const client = new es.Client({
  hosts: [process.env.ES_URL],
  connectionClass: awsES
});

describe("GET /api/datasets/:id/dcat", function() {
  this.timeout(10000);

  before(done => {
    client
      .index({
        index,
        type: process.env.ES_DOC_TYPE,
        id: "api_test",
        body: {
          dcat: {
            title: "name"
          }
        }
      })
      .then(() => done())
      .catch(err => done(err));
  });

  it("should return dataset dcat metadata.", done => {
    fetch(`${url}/api/datasets/api_test/dcat`)
      .then(res => res.json())
      .then(res => {
        expect(res.result.title).to.equal("name");
        done();
      })
      .catch(err => done(err));
  });
});
