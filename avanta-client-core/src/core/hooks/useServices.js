import { useQuery } from 'react-query'
import { ServicesService } from '../services'

const useServices = () => {
    const services = useQuery('services', ServicesService.getServices, { enabled: false })

    return services
}

export default useServices
