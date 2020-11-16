import { useQuery } from 'react-query'
import { OrdersService } from '../services'

const useOrdersHistory = (customerId) => {
    const ordersHistory = useQuery(
        ['ordersHistory', { customerId }],
        OrdersService.getOrdersHistory,
        { enabled: false }
    )

    return ordersHistory
}

export default useOrdersHistory
