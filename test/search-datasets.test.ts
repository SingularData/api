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

describe("/api/datasets/search", () => {
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

  it("should return datasets.", done => {
    fetch(`${url}/api/datasets/search?q=test`)
      .then(res => res.json())
      .then(res => {
        expect(res.result.length).to.equal(1);
        expect(res.result[0].message).to.equal("test");
        done();
      })
      .catch(err => done(err));
  });
});
