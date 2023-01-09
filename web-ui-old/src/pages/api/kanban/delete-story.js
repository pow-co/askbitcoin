export default function handler(req, res) {
  const { userStory, storyId, userStoryOrder } = req.body;
  userStory.splice(
    userStory.findIndex((story) => story.id === storyId),
    1
  );

  userStoryOrder.splice(
    userStoryOrder.findIndex((s) => s === storyId),
    1
  );
  const result = {
    userStory,
    userStoryOrder
  };
  return res.status(200).json({ ...result });
}
