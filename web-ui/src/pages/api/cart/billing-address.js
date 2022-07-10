export default function handler(req, res) {
  const { address } = req.body;
  return res.status(200).json({ billing: address });
}
