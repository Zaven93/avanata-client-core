const axios = require('axios')

const APPSYNC_BASE_URL =
    'https://x75hcd7xmverbcs3r3ac4rziba.appsync-api.us-east-1.amazonaws.com/graphql'
const APPSYNC_API_KEY = 'da2-hgomuqn6yfhwrcla3cm3vhk5bm'

module.exports = (query, variables) =>
    axios({
        url: APPSYNC_BASE_URL,
        method: 'POST',
        headers: {
            'x-api-key': APPSYNC_API_KEY
        },
        data: {
            query,
            variables
        }
    })
