import config = require("config");
import fetch from "node-fetch";
import { expect } from "chai";

const url = `${config.get("localHost")}:${config.get("localPort")}`;

describe("/api", () => {
  it("should return api version.", done => {
    fetch(`${url}/api`)
      .then(res => res.json())
      .then(res => {
        expect(res.version).to.equal(config.get("version"));
        done();
      })
      .catch(err => done(err));
  });
});
