export default function handler(req, res) {
  const { userStoryOrder } = req.body;
  return res.status(200).json({ userStoryOrder });
}
