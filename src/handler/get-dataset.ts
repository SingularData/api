import * as es from "../es-util";

export async function getDataset(req, res) {
  const id = req.params.id;

  try {
    const result = await es.getDataset(req.params.id);

    if (result) {
      res.json({ result });
    } else {
      res.status(404).send({ message: "Dataset is not found." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
