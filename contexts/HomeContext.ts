import { createContext, useContext } from 'react'
import { Post } from '@/interfaces/Post'

export type HomeContext = {
  latestPosts: Post[]
}

export const HomeContext = createContext<HomeContext>({
  latestPosts: [] as Post[],
})

export const useHomeContext = () => useContext(HomeContext)
