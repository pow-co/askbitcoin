export default function handler(req, res) {
  const { userStory } = req.body;
  return res.status(200).json({ userStory });
}
