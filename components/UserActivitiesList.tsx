import { List, ListIcon, ListItem, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { RiChat1Line, RiFileList3Line, RiHashtag } from 'react-icons/ri'

interface Props {
  postsNum: number
  commentNum: number
}

const UserActivitiesList = ({ postsNum, commentNum }: Props) => {
  return (
    <List
      bg={useColorModeValue('whiteAlpha.900', 'gray.700')}
      p={3}
      borderRadius={'10'}
      boxShadow={'0 0 1px'}
      spacing={2}
      w="30%"
      h="100%"
    >
      <ListItem>
        <ListIcon as={RiFileList3Line} boxSize="1.5em" />
        {`${postsNum} posts published`}
      </ListItem>
      <ListItem>
        <ListIcon as={RiHashtag} boxSize="1.5em" />
        {'10 tags followed'}
      </ListItem>
      <ListItem>
        <ListIcon as={RiChat1Line} boxSize="1.5em" />
        {`${commentNum} comments written`}
      </ListItem>
    </List>
  )
}

export default UserActivitiesList
