import { add, set, sub } from 'date-fns';

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

const profileIdsData = {
  profile1: 'profile-1',
  profile2: 'profile-2',
  profile3: 'profile-3'
};

const commentIdsData = {
  comment1: 'comment-1',
  comment2: 'comment-2',
  comment3: 'comment-3',
  comment4: 'comment-4',
  comment5: 'comment-5'
};

const itemsData = [
  {
    assign: profileIdsData.profile1,
    attachments: [],
    commentIds: [commentIdsData.comment1],
    description: 'Content of item 1',
    dueDate: sub(new Date(), { days: 12 }),
    id: itemIdsData.item1,
    image: 'profile-back-1.png',
    priority: 'low',
    title: 'Online fees payment & instant announcements'
  },
  {
    assign: profileIdsData.profile2,
    attachments: [],
    commentIds: [commentIdsData.comment2, commentIdsData.comment5],
    description: 'Content of item 2',
    dueDate: sub(new Date(), { days: 18 }),
    id: itemIdsData.item2,
    image: false,
    priority: 'high',
    title: 'Creation and Maintenance of Inventory Objects'
  },
  {
    assign: profileIdsData.profile3,
    attachments: [],
    description: 'Content of item 3',
    dueDate: sub(new Date(), { days: 8 }),
    id: itemIdsData.item3,
    image: false,
    priority: 'low',
    title: 'Update React & TypeScript version'
  },
  {
    assign: profileIdsData.profile2,
    attachments: [],
    commentIds: [commentIdsData.comment4],
    description: 'Content of item 4',
    dueDate: sub(new Date(), { days: 6 }),
    id: itemIdsData.item4,
    image: 'profile-back-2.png',
    priority: 'low',
    title: 'Set allowing rules for trusted applications.'
  },
  {
    assign: profileIdsData.profile2,
    attachments: [],
    commentIds: [commentIdsData.comment1, commentIdsData.comment2, commentIdsData.comment5],
    description: 'Content of item 5',
    dueDate: sub(new Date(), { days: 9 }),
    id: itemIdsData.item5,
    image: 'profile-back-3.png',
    priority: 'medium',
    title: 'Managing Applications Launch Control'
  },
  {
    assign: profileIdsData.profile3,
    attachments: [],
    commentIds: [commentIdsData.comment3, commentIdsData.comment4],
    description: 'Content of item 6',
    dueDate: set(new Date(), { hours: 10, minutes: 30 }),
    id: itemIdsData.item6,
    image: false,
    priority: 'medium',
    title: 'Run codemods'
  },
  {
    assign: profileIdsData.profile1,
    attachments: [],
    description: 'Content of item 7',
    dueDate: add(new Date(), { days: 5 }),
    id: itemIdsData.item7,
    image: 'profile-back-4.png',
    priority: 'low',
    title: 'Purchase Requisitions, Adjustments, and Transfers.'
  },
  {
    assign: profileIdsData.profile1,
    attachments: [],
    description: 'Content of item 8',
    dueDate: add(new Date(), { days: 17 }),
    id: itemIdsData.item8,
    image: false,
    priority: 'low',
    title: 'Attendance checking & homework details'
  },
  {
    assign: profileIdsData.profile3,
    attachments: [],
    commentIds: [commentIdsData.comment3],
    description: 'Content of item 9',
    dueDate: add(new Date(), { days: 8 }),
    id: itemIdsData.item9,
    image: false,
    priority: 'high',
    title: 'Admission, Staff & Schedule management'
  },
  {
    assign: profileIdsData.profile2,
    attachments: [],
    commentIds: [commentIdsData.comment5],
    description: 'Content of item 10',
    dueDate: add(new Date(), { days: 12 }),
    id: itemIdsData.item10,
    image: false,
    priority: 'low',
    title: 'Handling breaking changes'
  }
];

export default function handler(req, res) {
  return res.status(200).json({ items: itemsData });
}
