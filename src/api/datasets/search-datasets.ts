import * as es from "../es-util";

export async function searchDatasets(req, res) {
  const q = req.query.q;

  try {
    const result = await es.searchDatasets({ q });
    res.json({ q, result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
