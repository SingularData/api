import aws = require("aws-sdk");

export function bootstrapPipeline(req, res) {
  res.json({ message: "Data pipeline bootstrapped" });
}
