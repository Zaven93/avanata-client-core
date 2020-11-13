module.exports.sendResponse = (res) => ({
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(res.data)
})
