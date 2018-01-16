import { verify } from "jsonwebtoken";
import AWS = require("aws-sdk");

exports.auth = (event, context, callback) => {
  const token = event.authorizationToken;

  try {
    const verified: any = verify(token, process.env.SDN_ACCESS_KEY);
    const pass = verified.data;

    if (pass === "allow") {
      callback(null, generatePolicy("user", "Allow", event.methodArn));
    } else {
      callback("Unauthorized");
    }
  } catch (err) {
    callback("Invalid token");
  }
};

function generatePolicy(principalId, effect, resource) {
  const authResponse: any = {
    principalId
  };

  if (effect && resource) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: []
    };

    const statementOne = {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource
    };

    policyDocument.Statement.push(statementOne);
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
}
