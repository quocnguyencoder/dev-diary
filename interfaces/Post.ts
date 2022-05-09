export interface Post {
  _id: string
  _source: PostSource
}
export interface PostSource {
  authorID: string
  title: string
  metaTitle: string
  slug: string
  tags: string[]
  coverImg: string
  content: string
  description: string
  published: boolean
  publishedAt: string
  createdAt: string
  comments: string[]
  liked: string[]
}
