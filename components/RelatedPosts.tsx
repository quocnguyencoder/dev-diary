import { Divider, Heading, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import BlogTags from './BlogTags'
import NextChakraLink from './NextChakraLink'
import { Post } from '@/interfaces/Post'

interface Props {
  heading: React.ReactNode | string
  postList: Post[]
}

//handle relate posts by current post
const RelatedPosts = ({ heading, postList }: Props) => {
  const titleLinkColor = useColorModeValue('gray.700', 'whiteAlpha.900')
  return (
    <VStack
      bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      alignItems="left"
      spacing={3}
      borderRadius={'10'}
      w="100%"
      pb={4}
    >
      <Heading size="md" p="0.9em 0.2em 0.1em 0.9em">
        {heading}
      </Heading>

      {postList.map((post) => (
        <React.Fragment key={`related-${post._id}`}>
          <Divider orientation="horizontal" />
          <NextChakraLink
            href={`/u/${post._source.slug}`}
            text={
              <VStack alignItems="left" p="0 0.9em 0 0.9em">
                <Heading as="h6" size="sm">
                  {post._source.title}
                </Heading>
                <BlogTags tags={post._source.tags} />
              </VStack>
            }
            color={titleLinkColor}
          />
        </React.Fragment>
      ))}
    </VStack>
  )
}

export default RelatedPosts
