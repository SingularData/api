import fetch from "node-fetch";
import { expect } from "chai";
import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");

AWS.config.region = process.env.AWS_REGION;

const url = `http://${process.env.TEST_HOST}:${process.env.TEST_PORT}`;
const client = new es.Client({
  hosts: [process.env.ES_URL],
  connectionClass: awsES
});

describe("GET /api/datasets/search", function() {
  this.timeout(10000);

  before(done => {
    client
      .index({
        index: process.env.ES_INDEX,
        type: process.env.ES_DOC_TYPE,
        id: "api_test",
        body: {
          message: "api_test"
        }
      })
      .then(() => done())
      .catch(err => done(err));
  });

  it("should return datasets.", done => {
    fetch(`${url}/api/datasets/search?q=api_test`)
      .then(res => res.json())
      .then(res => {
        expect(res.result.length).to.equal(10);
        // expect(res.result[0].message).to.equal("api_test");
        done();
      })
      .catch(err => done(err));
  });
});
