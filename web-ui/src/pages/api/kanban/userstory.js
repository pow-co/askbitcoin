import { Chance } from 'chance';
import { add, set, sub } from 'date-fns';

const chance = new Chance();
const profileIdsData = {
  profile1: 'profile-1',
  profile2: 'profile-2',
  profile3: 'profile-3'
};
const userStoryIdsData = {
  userStory1: `1`,
  userStory2: `2`,
  userStory3: `3`,
  userStory4: `4`
};
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
const commentIdsData = {
  comment1: 'comment-1',
  comment2: 'comment-2',
  comment3: 'comment-3',
  comment4: 'comment-4',
  comment5: 'comment-5'
};

const userStoryData = [
  {
    acceptance: '',
    assign: profileIdsData.profile2,
    columnId: columnIdsData.column4,
    commentIds: [commentIdsData.comment5],
    description: chance.sentence(),
    dueDate: add(new Date(), { days: 12 }),
    id: userStoryIdsData.userStory1,
    priority: 'low',
    title: 'School Management Backend',
    itemIds: [itemIdsData.item1, itemIdsData.item8, itemIdsData.item9]
  },
  {
    acceptance: chance.sentence(),
    assign: profileIdsData.profile3,
    columnId: columnIdsData.column1,
    commentIds: [commentIdsData.comment3],
    description: chance.sentence(),
    dueDate: add(new Date(), { days: 8 }),
    id: userStoryIdsData.userStory2,
    priority: 'high',
    title: 'Inventory Implementation & Design',
    itemIds: [itemIdsData.item2, itemIdsData.item7]
  },
  {
    acceptance: chance.sentence({ words: 10 }),
    assign: profileIdsData.profile3,
    columnId: columnIdsData.column4,
    commentIds: [commentIdsData.comment3, commentIdsData.comment4],
    description: chance.sentence(),
    dueDate: set(new Date(), { hours: 10, minutes: 30 }),
    id: userStoryIdsData.userStory3,
    priority: 'medium',
    title: 'Theme migration from v4 to v5',
    itemIds: [itemIdsData.item3, itemIdsData.item6, itemIdsData.item10]
  },
  {
    acceptance: chance.sentence({ words: 5 }),
    assign: profileIdsData.profile1,
    columnId: columnIdsData.column3,
    commentIds: [commentIdsData.comment4],
    description: chance.sentence(),
    dueDate: sub(new Date(), { days: 8 }),
    id: userStoryIdsData.userStory4,
    priority: 'low',
    title: 'Lunch Beauty Application',
    itemIds: [itemIdsData.item4, itemIdsData.item5]
  }
];

export default function handler(req, res) {
  return res.status(200).json({ userStory: userStoryData });
}
