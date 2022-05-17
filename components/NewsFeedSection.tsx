import { Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import OptionButton from './OptionButton'
import BlogList from '@/components/BlogList'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

interface Props {
  latestPosts: Post[]
  userList: User[]
}
const NewsFeedSection = ({ latestPosts, userList }: Props) => {
  const [selectedOption, setSelectedOption] = useState('Relevant')
  const [selectedOrder, setSelectedOrder] = useState(0)
  const searchOptions = [
    {
      name: 'Relevant',
      orderOptions: [],
    },
    {
      name: 'Latest',
      orderOptions: [],
    },
    {
      name: 'Top',
      orderOptions: ['Week', 'Month', 'Year', 'All'],
    },
  ]

  const handleSelectOption = (option: string) => setSelectedOption(option)
  return (
    <>
      <HStack justify={'space-between'}>
        <HStack spacing={4}>
          {searchOptions.map((option) => (
            <OptionButton
              key={option.name}
              option={option.name}
              isSelected={option.name === selectedOption}
              action={handleSelectOption}
            />
          ))}
        </HStack>
        <HStack spacing={4}>
          {searchOptions
            .filter((option) => option.name === selectedOption)[0]
            .orderOptions.map((order, index) => (
              <Button
                key={order}
                fontSize={'large'}
                fontWeight={index === selectedOrder ? 'bold' : 'light'}
                variant="unstyled"
                _focus={{ outline: 0 }}
                _hover={{ color: 'teal' }}
                onClick={() => setSelectedOrder(index)}
              >
                {order}
              </Button>
            ))}
        </HStack>
      </HStack>
      <BlogList postList={latestPosts} userList={userList} />
    </>
  )
}

export default NewsFeedSection
