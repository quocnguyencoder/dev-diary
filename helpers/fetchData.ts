import { CommentSource } from '@/interfaces/Comment'

const getPostComments = async (postID: string) =>
  await fetch(`/api/comment?postID=${postID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

const getCommentUsersInfo = async (userIDList: string[]) =>
  await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify({ array: userIDList }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
const uploadComment = async (commentInfo: CommentSource) =>
  await fetch('/api/comment', {
    method: 'PUT',
    body: JSON.stringify({ data: commentInfo }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

const editUserProfile = async (profile: any) =>
  await fetch(`/api/users`, {
    method: 'PUT',
    body: JSON.stringify(profile),
    headers: {
      'Content-Type': 'application/json',
    },
  })

const likeComment = async (commentID: string, action: string) => {
  await fetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify({ commentID: commentID, action: action }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const updatedPostContent = async (
  postID: string,
  authorID: string,
  postContent: string,
  action: string,
) => {
  return await fetch(`/api/posts`, {
    method: 'DELETE',
    body: JSON.stringify({
      postID: postID,
      authorID: authorID,
      postContent: postContent,
      action: action,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const isSuccess = (response: Response, expectedStatus: number) =>
  response.status === expectedStatus ? true : false

export {
  getPostComments,
  getCommentUsersInfo,
  uploadComment,
  isSuccess,
  editUserProfile,
  likeComment,
  updatedPostContent,
}
