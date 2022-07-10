const image1 = '/assets/images/profile/img-profile1.png';
const image2 = '/assets/images/profile/img-profile2.jpg';
const image4 = '/assets/images/profile/img-profile4.jpg';

const posts = [
  {
    id: '#4POST_JONE_DOE',
    profile: {
      id: '#52JONE_DOE',
      avatar: 'img-user.png',
      name: 'John Doe',
      time: 'now'
    },
    data: {
      content: `Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.
            \n   Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in mollit irure enim tempor in.`,
      images: [],
      likes: {
        like: false,
        value: 0
      },
      comments: []
    }
  },
  {
    id: '#1POST_JONE_DOE',
    profile: {
      id: '#52JONE_DOE',
      avatar: 'user-1.png',
      name: 'John Doe',
      time: '15 min ago'
    },
    data: {
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. There are many variations of passages.',
      images: [
        {
          img: image1.toString(),
          featured: true
        }
      ],
      likes: {
        like: true,
        value: 102
      },
      comments: [
        {
          id: '#3COMMENT_JONE_DOE',
          profile: {
            id: '#52JONE_DOE',
            avatar: 'user-3.png',
            name: 'Barney Thea',
            time: '8 min ago '
          },
          data: {
            comment: 'It is a long established fact that a reader will be distracted by the readable content of a page.',
            likes: {
              like: true,
              value: 55
            }
          }
        },
        {
          id: '#2COMMENT_JONE_DOE',
          profile: {
            id: '#52JONE_DOE',
            avatar: 'user-4.png',
            name: 'Maddison Wilber',
            time: '5 min ago '
          },
          data: {
            comment:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.There are many variations of passages.',
            likes: {
              like: false,
              value: 68
            },
            replies: [
              {
                id: '#1REPLY_JONE_DOE',
                profile: {
                  id: '#52JONE_DOE',
                  avatar: 'user-5.png',
                  name: 'John Doe',
                  time: 'just now '
                },
                data: {
                  comment: 'It is a long established fact that a reader will be distracted by the readable content.',
                  likes: {
                    like: true,
                    value: 10
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: '#2POST_JONE_DOE',
    profile: {
      id: '#52JONE_DOE',
      avatar: 'user-2.png',
      name: 'John Doe',
      time: '15 min ago '
    },
    data: {
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page',
      images: [
        {
          img: image2.toString(),
          title: 'Image Title'
        },
        {
          img: image4.toString(),
          title: 'Painter'
        }
      ],
      likes: {
        like: false,
        value: 150
      },
      comments: [
        {
          id: '#2COMMENT_JONE_DOE',
          profile: {
            id: '#52JONE_DOE',
            avatar: 'user-3.png',
            name: 'Barney Thea',
            time: '15 min ago '
          },
          data: {
            comment:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
            likes: {
              like: true,
              value: 65
            },
            replies: []
          }
        }
      ]
    }
  },
  {
    id: '#3POST_JONE_DOE',
    profile: {
      id: '#52JONE_DOE',
      avatar: 'img-user.png',
      name: 'John Doe',
      time: '15 min ago '
    },
    data: {
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page',
      images: [],
      video: 'vyJU9efvUtQ',
      likes: {
        like: true,
        value: 540
      }
    }
  }
];
export default function handler(req, res) {
  const { postId, comment } = req.body;

  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  post.data.comments = [comment, ...cComments];
  return res.status(200).json({ posts: [...posts] });
}
