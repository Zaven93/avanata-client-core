import { useMutation } from 'react-query'
import { CustomerService } from '../services'

const useUploadAvatar = () => {
    const [uploadAvatar, { isLoading, error, data }] = useMutation(CustomerService.uploadAvatar)

    return {
        uploadAvatar,
        isLoading,
        error,
        data
    }
}

export default useUploadAvatar
