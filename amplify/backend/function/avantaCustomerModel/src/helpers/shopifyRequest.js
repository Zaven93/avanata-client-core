const axios = require('axios')

const SHOPIFY_BASE_URL = 'https://transactions-avanta.myshopify.com/admin/api/2020-07/graphql.json'
const SHOPIFY_BLOG_URL =
    'https://transactions-avanta.myshopify.com/admin/api/2020-07/blogs/68775608487/articles.json'
const SHOPIFY_ACCESS_TOKEN = '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'
const SHOPIFY_BLOG_TOKEN = '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'

module.exports = (query, variables, options) =>
    axios({
        url: options === 'blogs' ? SHOPIFY_BLOG_URL : SHOPIFY_BASE_URL,
        method: options === 'blogs' ? 'GET' : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token':
                options === 'blogs' ? SHOPIFY_BLOG_TOKEN : SHOPIFY_ACCESS_TOKEN
        },
        data:
            options === 'blogs'
                ? null
                : {
                      query,
                      variables
                  }
    })
