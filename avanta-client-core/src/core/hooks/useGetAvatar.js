import { useQuery } from 'react-query'
import { CustomerService } from '../services'

const useGetAvatar = () => {
    const getAvatar = useQuery('avatar', CustomerService.getAvatar, { enabled: true })

    return getAvatar
}

export default useGetAvatar
