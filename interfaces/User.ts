export interface User {
  _id: string
  _source: UserSource
}

export interface UserSource {
  username: string
  password: string
  email: string
  avatar: string
  displayName: string
  posts: string[]
  followings: string[]
  followers: string[]
  bio: string
  work: string
  education: string
  joinedDate: string
  savedPosts: string[]
  comments: string[]
  tags: string[]
}
