import { Button, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSWR from 'swr'
import OptionButton from './OptionButton'
import BlogList from '@/components/BlogList'
import { arrToURI } from '@/helpers/toURI'
import { User } from '@/interfaces/User'

interface Props {
  userInfo: User
}
const NewsFeedSection = ({ userInfo }: Props) => {
  const haveCurrentUserInfo = userInfo._id !== undefined
  const searchOptions = [
    {
      name: 'Relevant',
      orderOptions: [],
      query: haveCurrentUserInfo
        ? `?option=Relevant&followings=${arrToURI(
            userInfo._source.followings,
          )}&tags=${arrToURI(userInfo._source.tags)}`
        : `?option=Latest`,
    },
    {
      name: 'Latest',
      orderOptions: [],
      query: `?option=Latest`,
    },
    {
      name: 'Top',
      orderOptions: ['Week', 'Month', 'Year', 'All'],
      query: `?option=Top`,
    },
  ]
  const [selectedOption, setSelectedOption] = useState('Relevant')
  const [selectedOrder, setSelectedOrder] = useState(0)
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const getOptionQuery = (name: string) =>
    searchOptions.filter((option) => option.name === name)[0].query
  const { data, error } = useSWR(
    `/api/homepage${getOptionQuery(selectedOption)}`,
    fetcher,
  )

  const handleSelectOption = (option: string) => setSelectedOption(option)

  const isLoading = !data

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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div> Failed to load</div>
      ) : (
        <BlogList postList={data.results} userList={data.userList} />
      )}
    </>
  )
}

export default NewsFeedSection
