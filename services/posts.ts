import client from './client'
import { Post, PostSource } from '@/interfaces/Post'

const getLatestPosts = async () => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      match_all: {},
    },
    body: {
      sort: [{ publishedAt: { order: 'desc' } }],
    },
    size: 100,
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const getPostBySlug = async (slug: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          {
            match: {
              slug: `${slug}`,
            },
          },
        ],
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits[0])) as Post
}

// update to count api
const countAuthorPostsBySlug = async (authorID: string, slug: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          {
            match: {
              authorID: `${authorID}`,
            },
          },
          {
            match: {
              slug: slug,
            },
          },
        ],
      },
    },
  })
  return result.hits.hits.length
}

const queryPostsBySameAuthor = async (postIDList: string[]) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        should: {
          terms: {
            _id: postIDList,
          },
        },
      },
    },
    body: {
      sort: [{ publishedAt: { order: 'desc' } }],
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const createPost = async (data: PostSource) => {
  const response = await client.index({ index: 'posts', document: data })
  return response._id
}

const likePost = (postID: string, userID: string) => {
  client.update<Document>({
    index: 'posts',
    id: postID,
    script: {
      source: `if (ctx._source.liked.contains(params.liked)) { 
          ctx._source.liked.remove(ctx._source.liked.indexOf(params.liked)) 
        } else {
          ctx._source.liked.add(params.liked)}`,
      lang: 'painless',
      params: {
        liked: userID,
      },
    },
  })
}

const getAmountOfLikedPostByPostID = async (postID: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    _source_includes: 'liked',
    query: {
      bool: {
        should: {
          terms: {
            _id: [postID],
          },
        },
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits[0])) as Post
}

const getAllUserPosts = async (userID: string) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          {
            match: {
              authorID: `${userID}`,
            },
          },
        ],
      },
    },
    body: {
      sort: [{ publishedAt: { order: 'desc' } }],
    },
    size: 100,
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const getAuthorRelatedPosts = async (currentPost: Post) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        // has to be author's posts
        must: [
          {
            term: {
              'authorID.keyword': `${currentPost._source.authorID}`,
            },
          },
        ],
        // similar title or same tag posts should have high score
        should: [
          {
            match: {
              title: `${currentPost._source.title}`,
            },
          },
          {
            terms: {
              tags: currentPost._source.tags,
            },
          },
        ],
        // exclude current post from result
        must_not: [
          {
            term: {
              _id: `${currentPost._id}`,
            },
          },
        ],
      },
    },
    size: 3,
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const getOthersRelatedPosts = async (currentPost: Post) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        // similar title or same tag posts should have high score
        should: [
          {
            match: {
              title: `${currentPost._source.title}`,
            },
          },
          {
            terms: {
              tags: currentPost._source.tags,
            },
          },
        ],
        // exclude current author posts from result
        must_not: [
          {
            term: {
              'authorID.keyword': `${currentPost._source.authorID}`,
            },
          },
        ],
      },
    },
    size: 3,
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const searchPosts = async (
  searchTerm: string,
  filterBy: string,
  orderBy: string,
) => {
  const focusFields =
    filterBy === 'Tags' ? ['tags'] : ['title^3', 'description^2', 'tags']
  const filterUser = filterBy === 'tags' ? '*' : filterBy
  const userOnlyObj =
    filterBy !== 'Tags' && filterBy !== '*'
      ? ({
          term: {
            'authorID.keyword': `${filterUser}`,
          },
        } as any)
      : undefined
  const orderObj =
    orderBy !== ''
      ? ({
          sort: [{ publishedAt: { order: orderBy } }],
        } as any)
      : undefined
  const results = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        must: [
          userOnlyObj,
          {
            query_string: {
              query: `${searchTerm}`,
              fields: focusFields,
            },
          },
        ],
      },
    },
    body: orderObj,
    size: 100,
  })
  return JSON.parse(JSON.stringify(results.hits.hits)) as Post[]
}

const getUserNewsFeed = async (followings: string[], userTags: string[]) => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      bool: {
        // posts of following authors or tags should have high score
        should: [
          {
            terms: {
              'authorID.keyword': followings,
            },
          },
          {
            terms: {
              tags: userTags,
            },
          },
        ],
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

const getTopPosts = async () => {
  const result = await client.search<Document>({
    index: 'posts',
    query: {
      script_score: {
        query: {
          match_all: {},
        },
        script: {
          source: `_score 
          + Math.log10(doc['liked.keyword'].size()
          + doc['comments.keyword'].size() + 1 )`,
          lang: 'painless',
        },
      },
    },
  })
  return JSON.parse(JSON.stringify(result.hits.hits)) as Post[]
}

export {
  getLatestPosts,
  getPostBySlug,
  createPost,
  countAuthorPostsBySlug,
  queryPostsBySameAuthor,
  likePost,
  getAllUserPosts,
  getAmountOfLikedPostByPostID,
  getAuthorRelatedPosts,
  getOthersRelatedPosts,
  searchPosts,
  getUserNewsFeed,
  getTopPosts,
}
