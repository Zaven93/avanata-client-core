import { useMutation } from 'react-query'
import { AuthService } from '../services'

const useVerifyOTP = () => {
    const [verifyOtp, { isLoading, error, data }] = useMutation(AuthService.verifyOtp)

    return {
        verifyOtp,
        isLoading,
        error,
        data
    }
}

export default useVerifyOTP
