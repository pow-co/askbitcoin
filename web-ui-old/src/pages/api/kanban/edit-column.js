export default function handler(req, res) {
  const { column, columns } = req.body;

  columns.splice(
    columns.findIndex((c) => c.id === column.id),
    1,
    column
  );
  return res.status(200).json({ columns });
}
