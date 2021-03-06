import client from './client'
import { User, UserSource } from '@/interfaces/User'

const createUser = async (data: UserSource) =>
  client.index({ index: 'users', document: data })

const queryByUsername = async (username: string) => {
  const result = await client.search<Document>({
    index: 'users',
    query: {
      bool: {
        must: [
          {
            match: {
              username: `${username}`,
            },
          },
        ],
      },
    },
  })
  return result.hits.hits
}

const getUserByUserID = async (userID: string) => {
  const result = await client.get<Document>({
    index: 'users',
    _source_excludes: 'password',
    id: userID,
  })
  return JSON.parse(JSON.stringify(result)) as User
}

const getFollowingsOfUser = async (userID: string) => {
  const result = await client.search<Document>({
    index: 'users',
    _source_includes: 'followings',
    query: {
      bool: {
        should: {
          terms: {
            _id: [userID],
          },
        },
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits[0])) as User
}

const queryCommentator = async (userIDList: string[]) => {
  const result = await client.search<Document>({
    index: 'users',
    _source_excludes: 'password',
    query: {
      bool: {
        should: {
          terms: {
            _id: userIDList,
          },
        },
      },
    },
  })
  return result.hits.hits
}

const queryByIDList = async (userIDList: string[]) => {
  const result = await client.search<Document>({
    index: 'users',
    _source_excludes: 'password',
    query: {
      bool: {
        should: {
          terms: {
            _id: userIDList,
          },
        },
      },
    },
  })
  return result.hits.hits
}

const checkUserExists = async (username: string) => {
  const result = await queryByUsername(username)
  return result.length !== 0
}

const getUserByUsername = async (username: string) => {
  const result = await queryByUsername(username)
  return JSON.parse(JSON.stringify(result[0])) as User
}

const updateUserPosts = async (userID: string, postID: string) => {
  const result = await client.update<Document>({
    index: 'users',
    id: userID,
    script: {
      source: 'ctx._source.posts.add(params.postID)',
      lang: 'painless',
      params: {
        postID: postID,
      },
    },
  })
  return result
}

const removeUserPosts = (userID: string, postID: string) => {
  client.update<Document>({
    index: 'users',
    id: userID,
    script: {
      source: `if (ctx._source.posts.contains(params.postID)) { 
          ctx._source.posts.remove(ctx._source.posts.indexOf(params.postID))
         }`,
      lang: 'painless',
      params: {
        postID: postID,
      },
    },
  })
}

const removeUserComments = async (commentID: string) => {
  const result = await client.search<Document>({
    index: 'users',
    _source_excludes: 'password',
    query: {
      bool: {
        must: [
          {
            match: {
              comments: `${commentID}`,
            },
          },
        ],
      },
    },
  })

  await client.update<Document>({
    index: 'users',
    id: result.hits.hits[0]._id,
    script: {
      source: `if (ctx._source.comments.contains(params.commentID)) {
        ctx._source.comments.remove(ctx._source.comments.indexOf(params.commentID))
      }`,
      lang: 'painless',
      params: {
        commentID: commentID,
      },
    },
  })
}

const removeUserSavedPost = async (postID: string) => {
  const result = await client.search<Document>({
    index: 'users',
    _source_excludes: 'password',
    query: {
      bool: {
        must: [
          {
            match: {
              savedPosts: `${postID}`,
            },
          },
        ],
      },
    },
  })
  result.hits.hits.map((hit) => savedPosts(hit._id, postID))
}

const updateUserComments = async (userID: string, commentID: string) => {
  const result = await client.update<Document>({
    index: 'users',
    id: userID,
    script: {
      source: 'ctx._source.comments.add(params.commentID)',
      lang: 'painless',
      params: {
        commentID: commentID,
      },
    },
  })
  return result
}

const savedPosts = (userID: string, postID: string) => {
  client.update<Document>({
    index: 'users',
    id: userID,
    script: {
      source: `if (ctx._source.savedPosts.contains(params.postID)) { 
          ctx._source.savedPosts.remove(ctx._source.savedPosts.indexOf(params.postID))
         } 
         else {
           ctx._source.savedPosts.add(params.postID)
          }`,
      lang: 'painless',
      params: {
        postID: postID,
      },
    },
  })
}

const followAuthor = (userID: string, authorID: string) => {
  if (userID !== authorID) {
    client.update<Document>({
      index: 'users',
      id: userID,
      script: {
        source: `if (ctx._source.followings.contains(params.authorID)) { 
            ctx._source.followings.remove(ctx._source.followings.indexOf(params.authorID))
           }
           else {
             ctx._source.followings.add(params.authorID)
            }`,
        lang: 'painless',
        params: {
          authorID: authorID,
        },
      },
    })
  }
}

const getUsersInfoByIDList = async (idList: string[]) => {
  const result = await queryByIDList(idList)
  return JSON.parse(JSON.stringify(result)) as User[]
}

const editUserProfile = (
  userID: string,
  displayName: string,
  email: string,
  bio: string,
  work: string,
  education: string,
) => {
  client.update<Document>({
    index: 'users',
    id: userID,
    doc: {
      displayName: displayName,
      email: email,
      bio: bio,
      work: work,
      education: education,
    },
  })
}

const searchUser = async (searchTerm: string) => {
  const results = await client.search<Document>({
    index: 'users',
    _source_excludes: 'password',
    query: {
      query_string: {
        query: `${searchTerm}`,
        fields: ['username^2', 'displayName'],
      },
    },
  })
  return JSON.parse(JSON.stringify(results.hits.hits)) as User[]
}

export {
  createUser,
  checkUserExists,
  getUserByUsername,
  queryCommentator,
  getUserByUserID,
  updateUserPosts,
  updateUserComments,
  savedPosts,
  getUsersInfoByIDList,
  followAuthor,
  getFollowingsOfUser,
  editUserProfile,
  searchUser,
  removeUserPosts,
  removeUserComments,
  removeUserSavedPost,
}
