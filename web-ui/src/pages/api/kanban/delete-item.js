export default function handler(req, res) {
  const { columns, itemId, userStory, items } = req.body;
  const newColumn = columns.map((column) => {
    const itemIds = column.itemIds.filter((id) => id !== itemId);
    return {
      ...column,
      itemIds
    };
  });

  const newUserStory = userStory.map((story) => {
    const itemIds = story.itemIds.filter((id) => id !== itemId);
    return {
      ...story,
      itemIds
    };
  });

  items.splice(
    items.findIndex((item) => item.id === itemId),
    1
  );

  const result = {
    items,
    columns: newColumn,
    userStory: newUserStory
  };

  return res.status(200).json({ ...result });
}
