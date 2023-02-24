/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    AUTH0_SECRET: '54ba199284d434243aeb156ca2a6178489bc1e11f2608556e94ff5b3f4bfd369',
    AUTH0_BASE_URL: "https://localhost:3000",
    AUTH0_ISSUER_BASE_URL: 'https://dev-bt2m58wd25uh4wor.us.auth0.com',
    AUTH0_CLIENT_ID: 'AtyJoR2HTquSWSaMxjHj8NIMmMuqIaUP',
    AUTH0_CLIENT_SECRET: "8D0nJqxCnjPvN0VyUOGllw_QyaCR9n1ZGeG8FPPqBPQ6KPuwCQ8kYoCYuT4MX6z9",

    JHOPKINS_API_URL: 'https://eiynhjblti.execute-api.us-west-2.amazonaws.com/graphql/',
    JHOPKINS_API_KEY: "J4HjY7scRACG7y5PHQY2QRDSJxqKMCsAWWDUyc6FU8fC",
    JHOPKINS_WEBSOCKET: "wss://goqx9oqgu1.execute-api.us-west-2.amazonaws.com/graphql",
    S_BUCKET: "arn:aws:s3:::pharma-study-tu-1-janehopkins-bucket83908e77-1pf1efukqjels",

    FDA_API_URL: "https://6obdz3jqrc.execute-api.us-west-2.amazonaws.com/graphql/",
    FDA_API_KEY: "91pMDB8cjQiTX7MRVxtHZQAZoxUg7aVrjpykD6ZWxCpZ",
    FDA_WEBSCKET: "wss://77m038rv08.execute-api.us-west-2.amazonaws.com/graphql",

    BAVARIA_API_URL: "https://kb1rkcer24.execute-api.us-west-2.amazonaws.com/graphql/",
    BAVARIA_API_KEY: "3gLA5Sc52z6oLSGW5jBfCem6qJdEACuhn9UnsPgv5UzJ",
    BAVARIA_WEBSOCKET: "wss://767tjqz8n0.execute-api.us-west-2.amazonaws.com/graphql",
  },
};
