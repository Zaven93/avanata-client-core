import { useQuery } from 'react-query'
import { BlogsService } from '../services'

const useBlogs = () => {
    const getBlogs = useQuery('blogs', BlogsService.getBlogs, { enabled: false })

    return getBlogs
}

export default useBlogs
