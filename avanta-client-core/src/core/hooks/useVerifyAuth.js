const { useMutation } = require('react-query')
const { AuthService } = require('../services')

const useVerifyAuth = () => {
    const [verifyAuth, { isLoading, error, data }] = useMutation(AuthService.verifyAuth)

    return {
        verifyAuth,
        isLoading,
        error,
        data
    }
}

export default useVerifyAuth
