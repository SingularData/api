import * as es from "../es-util";

export async function getDataset(req, res) {
  const id = req.params.id;

  try {
    const result = await es.getDataset(req.params.id);

    if (result) {
      res.json({ result });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getDatasetDCAT(req, res) {
  const id = req.params.id;

  try {
    const result = await es.getDatasetDCAT(req.params.id);

    if (result) {
      res.json({ result });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getDatasetMetadata(req, res) {
  const id = req.params.id;

  try {
    const result = await es.getDatasetMetadata(req.params.id);

    if (result) {
      res.json({ result });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function searchDatasets(req, res) {
  const q = req.query.q;

  try {
    const result = await es.searchDatasets({
      q,
      _sourceInclude: ["type", "dcat"]
    });

    res.json({ q, result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
