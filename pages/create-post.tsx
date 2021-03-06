import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  BiBold,
  BiCode,
  BiCodeBlock,
  BiHeading,
  BiImage,
  BiItalic,
  BiLink,
  BiListOl,
  BiListUl,
} from 'react-icons/bi'
import { ImQuotesLeft } from 'react-icons/im'
import toSpinalCase from '@/helpers/toSpinalCase'
import { PostSource } from '@/interfaces/Post'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [content, setContent] = useState('')
  const { data: session, status } = useSession()
  const router = useRouter()
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleInputTag = (key: string) => {
    if (key === ' ' && tags.length <= 4) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    const tagsCopy = [...tags]
    tagsCopy.splice(index, 1)
    setTags(tagsCopy)
  }

  const handleCreatePost = async () => {
    if (session) {
      const postContent: PostSource = {
        authorID: `${session.id}`,
        title: title,
        metaTitle: title,
        slug: toSpinalCase(title),
        tags: tags,
        coverImg:
          'https://res.cloudinary.com/practicaldev/image/fetch/s--jNcdxw77--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/sfwcvweirpf2qka2lg2b.png',
        content: content,
        description: title,
        published: true,
        publishedAt: moment().toISOString(),
        createdAt: moment().toISOString(),
        comments: [],
        liked: [],
      }
      const sendData = await fetch('/api/posts', {
        method: 'PUT',
        body: JSON.stringify({ data: postContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await sendData
      if (response.status === 201) {
        //alert(response.body)
        router.push('/')
      } else {
        alert('Something went wrong')
      }
    }
  }
  const panelBackground = useColorModeValue('white', 'gray.900')
  return isAuthenticated ? (
    <>
      <Container maxW="container.lg">
        <Box
          bgColor={panelBackground}
          marginTop={'1%'}
          borderRadius={'15px'}
          p={'5%'}
        >
          <Flex direction="column">
            <Button colorScheme="teal" variant="outline">
              Add a cover image
            </Button>
            <Input
              variant="unstyled"
              placeholder="New post title here..."
              sx={{ fontSize: '3em', fontWeight: 'bold' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Flex>
              <HStack spacing={3}>
                {tags.map((tag, index) => (
                  <Tag size={'lg'} key={`${index}-${tag}`} colorScheme="teal">
                    <TagLabel>{`#${tag}`}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveTag(index)} />
                  </Tag>
                ))}
              </HStack>
              <Input
                variant="unstyled"
                placeholder="Add tags here..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyUp={(e) => handleInputTag(e.key)}
              />
            </Flex>
          </Flex>
          <Grid
            templateColumns={{ base: 'repeat(5, 1fr)', md: 'repeat(10, 1fr)' }}
            gap={2}
          >
            <IconButton
              aria-label="bold"
              size="lg"
              icon={<BiBold fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="italic"
              size="lg"
              icon={<BiItalic fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="link"
              size="lg"
              icon={<BiLink fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="ordered list"
              size="lg"
              icon={<BiListOl fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="unordered list"
              size="lg"
              icon={<BiListUl fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="heading"
              size="lg"
              icon={<BiHeading fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="quote"
              size="lg"
              icon={<ImQuotesLeft fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="code"
              size="lg"
              icon={<BiCode fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="code block"
              size="lg"
              icon={<BiCodeBlock fontSize="1.5rem" />}
            />
            <IconButton
              aria-label="image"
              size="lg"
              icon={<BiImage fontSize="1.5rem" />}
            />
          </Grid>
          <Box>
            <Textarea
              variant="unstyled"
              size="lg"
              resize="none"
              placeholder="Your content here ..."
              height={'30vh'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
        </Box>
        <HStack spacing={2} pt="2%" pb="3">
          <Button
            colorScheme="blue"
            size="md"
            onClick={() => handleCreatePost()}
          >
            Publish
          </Button>
          <Button colorScheme="gray" variant="ghost">
            Save draft
          </Button>
        </HStack>
      </Container>
    </>
  ) : (
    <></>
  )
}

export default CreatePost
