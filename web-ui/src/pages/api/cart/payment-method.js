export default function handler(req, res) {
  const { method } = req.body;
  return res.status(200).json({ method });
}
