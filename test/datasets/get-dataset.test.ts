import config = require("config");
import fetch from "node-fetch";
import { expect } from "chai";
import AWS = require("aws-sdk");
import es = require("elasticsearch");
import awsES = require("http-aws-es");

AWS.config.region = "us-east-1";

const url = `${config.get("localHost")}:${config.get("localPort")}`;
const index = config.get("es.index");
const client = new es.Client({
  hosts: [config.get("es.url")],
  connectionClass: awsES
});

describe("GET /api/datasets/:id", function() {
  this.timeout(10000);

  before(done => {
    client
      .index({
        index,
        type: "test",
        id: "api_test",
        body: {
          message: "test"
        }
      })
      .then(() => done())
      .catch(err => done(err));
  });

  it("should return a dataset.", done => {
    fetch(`${url}/api/datasets/api_test`)
      .then(res => res.json())
      .then(res => {
        expect(res.result.message).to.equal("test");
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
