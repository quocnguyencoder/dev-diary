import { Heading, Image, VStack } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import EditPost from './EditPost'
import BlogAuthor from '@/components/BlogAuthor'
import BlogTags from '@/components/BlogTags'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  postContent: Post
  author: User
}

const BlogContent = ({ postContent, author }: Props) => {
  const [edit, setEdit] = useState(false)
  return (
    <>
      <Image
        w="100%"
        maxHeight="40vh"
        objectFit="cover"
        borderRadius={'10px 10px 0 0'}
        src={postContent._source.coverImg}
        alt="cover image"
      />
      <VStack w="100%" p="1% 5% 3% 5%" gap="1em" align="left">
        <BlogAuthor
          name={author._source.displayName}
          date={postContent._source.publishedAt}
          id={postContent._source.authorID}
          username={author._source.username}
          postID={postContent._id}
          setEdit={setEdit}
        />
        <Heading as="h2" size="3xl">
          {postContent._source.title}
        </Heading>
        <BlogTags tags={postContent._source.tags} />

        {!edit ? (
          <ReactMarkdown
            components={ChakraUIRenderer()}
            remarkPlugins={[remarkGfm]}
            skipHtml
          >
            {postContent._source.content}
          </ReactMarkdown>
        ) : (
          <EditPost postContent={postContent} setEdit={setEdit} />
        )}
      </VStack>
    </>
  )
}

export default BlogContent
