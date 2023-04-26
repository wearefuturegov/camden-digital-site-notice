This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, in root directory, rename 'env.example' to 'env.local' and populate fields with given env variables



Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run Sanity CMS locally, open a new tab and run:

```bash
yarn sanity
```

Open [http://localhost:3333](http://localhost:3333) to see the CMS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploying

The app is hosted on Netlify and auto-deploys from the main branch. Preview
deploys are enabled for other branches.

To deploy changes to Sanity, do

```
cd admin && sanity deploy
```

You may need to login via the Sanity CLI if you haven't already. To do this, run:

```
sanity login
```
