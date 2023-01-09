export default function handler(req, res) {
  const { columnId, columnsOrder, columns } = req.body;
  columns.splice(
    columns.findIndex((column) => column.id === columnId),
    1
  );

  columnsOrder.splice(
    columnsOrder.findIndex((cId) => cId === columnId),
    1
  );
  return res.status(200).json({ columns, columnsOrder });
}
