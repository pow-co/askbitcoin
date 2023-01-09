export default function handler(req, res) {
  const { items, itemId, comment, comments } = req.body;
  const newItems = items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        commentIds: item.commentIds ? [...item.commentIds, comment.id] : [comment.id]
      };
    }
    return item;
  });

  const result = {
    items: newItems,
    comments: [...comments, comment]
  };
  return res.status(200).json({ ...result });
}
