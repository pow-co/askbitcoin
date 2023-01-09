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

const commentsData = [
  {
    id: commentIdsData.comment1,
    comment: 'Comment 1',
    profileId: profileIdsData.profile1
  },
  {
    id: commentIdsData.comment2,
    comment: 'Comment 2',
    profileId: profileIdsData.profile2
  },
  {
    id: commentIdsData.comment3,
    comment: 'Comment 3',
    profileId: profileIdsData.profile3
  },
  {
    id: commentIdsData.comment4,
    comment: 'Comment 4',
    profileId: profileIdsData.profile2
  },
  {
    id: commentIdsData.comment5,
    comment: 'Comment 5',
    profileId: profileIdsData.profile3
  }
];

export default function handler(req, res) {
  return res.status(200).json({ comments: commentsData });
}
