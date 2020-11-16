import axios from 'axios'

export const getBlogs = () =>
    axios({
        url: 'https://55kj2fiku2.execute-api.us-east-1.amazonaws.com/dev/blogs',
        method: 'GET'
    })
