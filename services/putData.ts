import client from './client'
import { PostSource } from '@/interfaces/Post'

const createPost = async (data: PostSource) =>
  client.index({ index: 'posts', document: data })

export default createPost
