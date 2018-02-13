import AWS = require("aws-sdk");

AWS.config.region = "us-east-1";

export function bootstrapPipeline(req, res) {
  const body = req.body;
  const sns = new AWS.SNS();

  let task: any = Promise.resolve();

  if (!body.testing) {
    task = sns
      .publish({
        Message: "start new indexing",
        TopicArn: process.env.SNS_BOOTSTRAP_QUEUE
      })
      .promise();
  }

  task
    .then(() => res.json({ message: "Data pipeline bootstrapped" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
}
