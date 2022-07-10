export default function handler(req, res) {
  const { card } = req.body;
  return res.status(200).json({ card });
}
