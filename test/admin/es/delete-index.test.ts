import fetch from "node-fetch";
import { expect } from "chai";

const url = `http://${process.env.TEST_HOST}:${process.env.TEST_PORT}`;

describe("DELETE /api/admin/es/index", () => {
  it("should reject if invalid token is provided.", done => {
    const params = {
      method: "DELETE",
      body: "{}",
      headers: {
        token: "invalid token"
      }
    };

    fetch(`${url}/api/admin/es/index`, params)
      .then(res => res.json())
      .then(res => {
        expect(res.statusCode).to.equal(401);
        expect(res.error).to.equal("Unauthorized");
        done();
      })
      .catch(err => done(err));
  });
});
