const { useMutation } = require('react-query')
const { AuthService } = require('../services')

const useSignOut = () => {
    const [signOut, { isLoading, error, data }] = useMutation(AuthService.signOut)

    return {
        signOut,
        isLoading,
        error,
        data
    }
}

export default useSignOut
