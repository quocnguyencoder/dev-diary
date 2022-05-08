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

const isSuccess = (response: Response, expectedStatus: number) =>
  response.status === expectedStatus ? true : false

export { getPostComments, getCommentUsersInfo, uploadComment, isSuccess }
