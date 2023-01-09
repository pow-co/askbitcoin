export default function handler(req, res) {
  const { selectedItem } = req.body;
  return res.status(200).json({ selectedItem });
}
