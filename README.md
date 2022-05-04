# Dev Diary - Share your dev strories

This is a blog project using [Next.js](https://nextjs.org/), [ChakraUI](https://chakra-ui.com/) and [Elastic Search](https://www.elastic.co/elasticsearch/). You can visit the project on [this website](https://dev-diary-nu.vercel.app/)

## Getting Started

To run this project, you should have a running Elastic Search service, then add your Elastic Search infomations to a .env file:

```bash
ELASTICSEARCH_URL = "...your elastic search url..."
ELASTICSEARCH_USERNAME = "...elastic search username..."
ELASTICSEARCH_PASSWORD = "...elastic search password..."
```

This project uses [NextAuth.js](https://next-auth.js.org/) for authentication, so you have to add some additional variables to your .env file:

```bash
JWT_SECRET_KEY = "...a jwt secret key..."
VERCEL_URL = "...your vercel url..."
NEXTAUTH_URL = "http://127.0.0.1:3000"
```
- JWT secret key is a random string used to hash tokens, sign cookies and generate cryptographic keys. I used [guidgenerator](https://www.guidgenerator.com/) to generate it.
- If you want to deploy this project to Vercel, remember to add your deployment URL here for NextAuth.js to work.
- The NEXTAUTH_URL is for NextAuth.js to work in the local environment.

Finally, you should install all dependencies of this project by running:

```bash
npm install
# or
yarn install
```

Then, run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) with your browser to see the result.


## Features

- Easy styling customization with [Chakra UI](https://chakra-ui.com/guides/first-steps) 
- Mobile-friendly view
- Light and dark theme
- Support for nested routing of blog posts
- Config authentication with NextAuth.js
- Writing post using popular markdown syntax
- Easy to search for anything by using Elastic Search search api

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Notes:
- This project is under development so don't hesitate to test on our production website and open issue.
