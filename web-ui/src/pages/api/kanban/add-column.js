export default function handler(req, res) {
  const { column, columns, columnsOrder } = req.body;
  const result = {
    columns: [...columns, column],
    columnsOrder: [...columnsOrder, column.id]
  };
  return res.status(200).json({ ...result });
}
