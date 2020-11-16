import { useMutation } from 'react-query'
import { AuthService } from '../services'

const useLogin = () => {
    const [login, { isLoading, error, data }] = useMutation(AuthService.signIn)

    return {
        login,
        isLoading,
        error,
        data
    }
}

export default useLogin
