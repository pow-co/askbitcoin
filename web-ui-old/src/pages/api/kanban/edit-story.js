export default function handler(req, res) {
  const { userStory, story } = req.body;
  userStory.splice(
    userStory.findIndex((s) => s.id === story.id),
    1,
    story
  );

  const result = {
    userStory
  };
  return res.status(200).json({ ...result });
}
