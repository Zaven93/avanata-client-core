import React, { useEffect, useState } from 'react'
import { useServices } from '../core/hooks'

const Services = () => {
    const { data: servicesData, refetch: getServices } = useServices()
    const [activeServices, setActiveServices] = useState('')

    useEffect(() => {
        getServices()
    }, [])

    console.log('Services data', servicesData)
    return (
        <>
            <div>Services</div>
            <button onClick={() => setActiveServices('Dental')}>Dental</button>
            <button onClick={() => setActiveServices('Plastic surgery')}>Plastic surgery</button>
            <button onClick={() => setActiveServices('Aestetic')}>Aestetics</button>
            {servicesData && (
                <ul>
                    {servicesData.data.data.products.edges
                        .filter((service) => service.node.productType === activeServices)
                        .map((service, i) => (
                            <li key={i}>
                                <p>Title: {service.node.title}</p>
                                <p>Service type: {service.node.productType}</p>
                                <p>Price: {service.node.variants.edges[0].node.price}</p>
                            </li>
                        ))}
                </ul>
            )}
        </>
    )
}

export default Services
