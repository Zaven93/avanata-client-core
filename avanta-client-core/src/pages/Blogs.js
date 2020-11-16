import React, { useEffect } from 'react'
import { useBlogs } from '../core/hooks'

const Blogs = () => {
    const { data: blogsData, refetch: getBlogs } = useBlogs()

    useEffect(() => {
        getBlogs()
    }, [])

    console.log('Blogs data', blogsData)

    return <div>Blogs</div>
}

export default Blogs
