const itemIdsData = {
  item1: `1`,
  item2: `2`,
  item3: `3`,
  item4: `4`,
  item5: `5`,
  item6: `6`,
  item7: `7`,
  item8: `8`,
  item9: `9`,
  item10: `10`
};

const columnIdsData = {
  column1: 'column-1',
  column2: 'column-2',
  column3: 'column-3',
  column4: 'column-4'
};
const columnsData = [
  {
    id: columnIdsData.column1,
    title: 'New',
    itemIds: [itemIdsData.item1, itemIdsData.item8, itemIdsData.item9]
  },
  {
    id: columnIdsData.column2,
    title: 'Active',
    itemIds: [itemIdsData.item3, itemIdsData.item4, itemIdsData.item5]
  },
  {
    id: columnIdsData.column3,
    title: 'Resolved',
    itemIds: [itemIdsData.item2]
  },
  {
    id: columnIdsData.column4,
    title: 'Closed',
    itemIds: [itemIdsData.item6, itemIdsData.item7, itemIdsData.item10]
  }
];
export default function handler(req, res) {
  return res.status(200).json({ columns: columnsData });
}
