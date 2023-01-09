import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_TWETCH_ENDPOINT;
const authToken = "";

const graphqlClient = new GraphQLClient(graphqlAPI, {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export const getLocalFeed = async () => {
  const result = await fetch("/api/local", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getLocalFeedPagination = async (cursor) => {
  const result = await fetch(`/api/local?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getGlobalFeed = async () => {
  const result = await fetch("/api/global", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getGlobalFeedPagination = async (cursor) => {
  const result = await fetch(`/api/global?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getNotificationsFeed = async (me) => {
  const result = await fetch(`/api/notifications?me=${me}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getPostResults = async (input) => {
  const result = await fetch(`/api/search/posts?search=${input}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getPostResultsPagination = async (input, cursor) => {
  const result = await fetch(
    `/api/search/posts?search=${input}&cursor=${cursor}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
        "content-type": "application/json",
      },
    }
  );
  return result.json();
};

export const getUserResults = async (input) => {
  const result = await fetch(`/api/search/users?search=${input}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getUserResultsPagination = async (input, cursor) => {
  const result = await fetch(
    `/api/search/users?search=${input}&cursor=${cursor}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
        "content-type": "application/json",
      },
    }
  );
  return result.json();
};

export const getNotificationsFeedPagination = async (me, cursor) => {
  const result = await fetch(`/api/notifications?me=${me}&&cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileCardQuery = async (id, me) => {
  const query = gql`
    query userProfileCardQuery($id: BigInt!, $me: BigInt) {
      userById(id: $id) {
        ...userProfileCard
        ...followButton
        ...followsYou
        ...userIcon
      }
    }

    fragment followButton on User {
      id
      followersByFollowerUserId(condition: { userId: $me }) {
        nodes {
          nodeId
        }
      }
    }

    fragment followsYou on User {
      id
      followersByUserId(
        filter: {
          followerUserId: { equalTo: $me }
          userId: { notEqualTo: $me }
        }
      ) {
        totalCount
      }
    }

    fragment userIcon on User {
      id
      icon
      verifiedIcon
    }

    fragment userProfileCard on User {
      name
      id
      icon
      description
      profileUrl
      followingCount
      followerCount
      dmConversationId
      banner
      publicKey
      twitterHandle
    }
  `;

  const result = await graphqlClient.request(query, { id, me });
  return result.userById;
};

export const userProfileCardAnonQuery = async (id) => {
  const query = gql`
    query userProfileCardAnonQuery($id: BigInt!) {
      userById(id: $id) {
        ...userProfileCard
        ...userIcon
      }
    }

    fragment userIcon on User {
      id
      icon
      verifiedIcon
    }

    fragment userProfileCard on User {
      name
      id
      icon
      description
      profileUrl
      followingCount
      followerCount
      dmConversationId
      banner
      publicKey
      twitterHandle
    }
  `;

  const result = await graphqlClient.request(query, { id });
  return result.userById;
};

export const userProfileLatestFeedQuery = async (userId) => {
  const result = await fetch(`/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileLatestFeedPaginationQuery = async (userId, cursor) => {
  const result = await fetch(`/api/user/${userId}?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileReplyFeedQuery = async (userId) => {
  const result = await fetch(`/api/user/${userId}/replies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileReplyFeedPaginationQuery = async (userId, cursor) => {
  const result = await fetch(`/api/user/${userId}/replies?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileLikeFeedQuery = async (userId) => {
  const result = await fetch(`/api/user/${userId}/likes`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileLikeFeedPaginationQuery = async (userId, cursor) => {
  const result = await fetch(`/api/user/${userId}/likes?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileMediaFeedQuery = async (userId) => {
  const result = await fetch(`/api/user/${userId}/media`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileMediaFeedPaginationQuery = async (userId, cursor) => {
  const result = await fetch(`/api/user/${userId}/media?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const postDetailQuery = async (txid) => {
  let query = `
  query postDetailQuery($txid: String!) {
    allPosts(condition: { transaction: $txid }) {
      edges {
        node {
          bContent
          createdAt
          files
          id
          numBranches
          numLikes
          postsByReplyPostId {
            totalCount
          }
          replyPostId
          transaction
          type
          youBranchedCalc
          youLikedCalc
          userId
          userByUserId {
            icon
            name
          }
          children {
            edges {
              node {
                bContent
                createdAt
                files
                id
                numBranches
                numLikes
                postsByReplyPostId {
                  totalCount
                }
                replyPostId
                transaction
                type
                youBranchedCalc
                youLikedCalc
                userId
                userByUserId {
                  icon
                  name
                }
              }
            }
          }
          parents {
            edges {
              node {
                bContent
                createdAt
                files
                id
                numBranches
                numLikes
                postsByReplyPostId {
                  totalCount
                }
                replyPostId
                transaction
                type
                youBranchedCalc
                youLikedCalc
                userId
                userByUserId {
                  icon
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const result = await graphqlClient.request(query, { txid });
  return result.allPosts;
};
