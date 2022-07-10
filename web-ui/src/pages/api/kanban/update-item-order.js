export default function handler(req, res) {
  const { columns } = req.body;
  return res.status(200).json({ columns });
}
