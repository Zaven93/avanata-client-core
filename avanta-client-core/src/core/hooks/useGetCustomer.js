import { useMutation } from 'react-query'
import { CustomerService } from '../services'

const useGetCustomer = () => {
    const [customerByPhone, { isLoading, error, data }] = useMutation(CustomerService.getCustomer)

    return {
        customerByPhone,
        isLoading,
        error,
        data
    }
}

export default useGetCustomer
