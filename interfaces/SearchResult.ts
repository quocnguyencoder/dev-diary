import { Post } from './Post'
import { User } from './User'

export interface SearchResult {
  results: Post[]
  userList: User[]
}
