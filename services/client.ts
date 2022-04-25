import { Client } from '@elastic/elasticsearch'

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'https:example.com',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || '',
    password: process.env.ELASTICSEARCH_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export default client
