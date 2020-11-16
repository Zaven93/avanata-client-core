import { useMutation } from 'react-query'
import { AuthService } from '../services'

const useSignUp = () => {
    const [signUp, { isLoading, data, error }] = useMutation(AuthService.signUp)

    return {
        signUp,
        isLoading,
        error,
        data
    }
}

export default useSignUp
