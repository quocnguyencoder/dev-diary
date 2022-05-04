import { HStack, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface Props {
  icon: ReactElement
  text: string
}

const UserInfoWithIcon = ({ icon, text }: Props) => {
  return (
    <HStack>
      {icon}
      <Text>{text}</Text>
    </HStack>
  )
}

export default UserInfoWithIcon
