import fetch from "node-fetch";
import { expect } from "chai";
import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");

AWS.config.region = process.env.AWS_REGION;

const url = `http://${process.env.TEST_HOST}:${process.env.TEST_PORT}`;
const index = process.env.ES_INDEX;
const client = new es.Client({
  hosts: [process.env.ES_URL],
  connectionClass: awsES
});

describe("GET /api/datasets/:id", function() {
  this.timeout(10000);

  before(done => {
    client
      .index({
        index,
        type: process.env.ES_DOC_TYPE,
        id: "api_test",
        body: {
          message: "api_test"
        }
      })
      .then(() => done())
      .catch(err => done(err));
  });

  it("should return a dataset.", done => {
    fetch(`${url}/api/datasets/api_test`)
      .then(res => res.json())
      .then(res => {
        expect(res.result.message).to.equal("api_test");
        done();
      })
      .catch(err => done(err));
  });

  it("should return 404 if the dataset is not found.", done => {
    fetch(`${url}/api/datasets/not_found`)
      .then(res => res.json())
      .then(res => {
        expect(res.message).to.equal("Not Found");
        done();
      })
      .catch(err => done(err));
  });
});
