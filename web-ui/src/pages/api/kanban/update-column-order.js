export default function handler(req, res) {
  const { columnsOrder } = req.body;
  return res.status(200).json({ columnsOrder });
}
