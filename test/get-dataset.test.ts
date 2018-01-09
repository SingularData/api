import config = require("config");
import fetch from "node-fetch";
import { expect } from "chai";

describe("/api", () => {
  it("should return api version.", done => {
    fetch("http://localhost:3000/api")
      .then(res => res.json())
      .then(res => {
        expect(res.version).to.equal(config.get("version"));
        done();
      });
  });
});
