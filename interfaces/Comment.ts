export interface Comment {
  _id: string
  _source: CommentSource
}

export interface CommentSource {
  commentatorID: string
  content: string
  commentAt: string
  postID: string
  likes: string[]
  reply: string[]
}
