import fetch from "node-fetch";
import config = require("config");
import { expect } from "chai";
import { generateToken } from "../../script/generate-token";

const url = `${config.get("localHost")}:${config.get("localPort")}`;

describe("/admin/bootstrap_pipeline", () => {
  it("should reject if invalid token is provided.", done => {
    const params = {
      method: "POST",
      body: "{}",
      headers: {
        token: "invalid token"
      }
    };

    fetch(`${url}/api/admin/bootstrap_pipeline`, params)
      .then(res => res.json())
      .then(res => {
        expect(res.statusCode).to.equal(401);
        expect(res.error).to.equal("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });

  it("should accept if valid token is provided.", done => {
    const params = {
      method: "POST",
      body: "{}",
      headers: {
        token: generateToken()
      }
    };

    fetch(`${url}/api/admin/bootstrap_pipeline`, params)
      .then(res => res.json())
      .then(res => {
        expect(res.message).to.equal("Data pipeline bootstrapped");
        done();
      })
      .catch(err => done(err));
  });
});
