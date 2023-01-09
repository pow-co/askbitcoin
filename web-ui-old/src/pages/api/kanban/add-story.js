export default function handler(req, res) {
  const { userStory, story, userStoryOrder } = req.body;
  const result = {
    userStory: [...userStory, story],
    userStoryOrder: [...userStoryOrder, story.id]
  };
  return res.status(200).json({ ...result });
}
