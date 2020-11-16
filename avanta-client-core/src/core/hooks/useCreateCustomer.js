import { useMutation } from 'react-query'
import { CustomerService } from '../services'

const useCreateCustomer = () => {
    const [createCustomer, { isLoading, error, data }] = useMutation(CustomerService.createCustomer)

    return {
        createCustomer,
        isLoading,
        error,
        data
    }
}

export default useCreateCustomer
