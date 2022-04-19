import { HStack, SpaceProps, Tag } from '@chakra-ui/react'
import React from 'react'
import commonTagsList from '@/constants/tagsList'

interface IBlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        const isCommonTag = Object.prototype.hasOwnProperty.call(
          commonTagsList,
          tag,
        )
        const getColor = (type: 'dark' | 'light' | 'hover') => {
          const tagName = isCommonTag ? tag : '_default'
          switch (type) {
            case 'light':
              return commonTagsList[tagName].color.light
            case 'dark':
              return commonTagsList[tagName].color.dark
            case 'hover':
              return commonTagsList[tagName].color.hover
          }
        }
        return (
          <Tag
            size={'md'}
            variant="solid"
            bg={getColor('light')}
            _dark={{
              bg: getColor('dark'),
              _hover: { border: '2px #fff', bg: getColor('hover') },
            }}
            _hover={{ border: '2px #fff', bg: getColor('hover') }}
            cursor={'pointer'}
            key={tag}
          >
            {`#${tag}`}
          </Tag>
        )
      })}
    </HStack>
  )
}

export default BlogTags
