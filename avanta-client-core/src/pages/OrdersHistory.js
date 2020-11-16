import React, { useEffect, useState } from 'react'
import { useVerifyAuth, useGetCustomer, useOrdersHistory } from '../core/hooks'

const OrdersHistory = () => {
    const [shopifyCustomerId, setShopifyCustomerId] = useState('')

    const { verifyAuth, data: authData } = useVerifyAuth()
    const { customerByPhone, data: customerData } = useGetCustomer()
    const { data: ordersHistory, refetch: getOrdersHistory } = useOrdersHistory(shopifyCustomerId)

    useEffect(() => {
        verifyAuth()
    }, [])

    useEffect(() => {
        if (!authData) {
            return
        }
        customerByPhone({ phone_number: authData.attributes.phone_number })
    }, [authData])

    useEffect(() => {
        if (!customerData) {
            return
        }

        setShopifyCustomerId(
            customerData.data.data.userByPhone.items[0].shopifyCustomerId
                .split('Customer')[1]
                .slice(1)
        )

        console.log(
            'Shopify customer id',
            customerData.data.data.userByPhone.items[0].shopifyCustomerId
                .split('Customer')[1]
                .slice(1)
        )
    }, [customerData])

    useEffect(() => {
        getOrdersHistory()
    }, [shopifyCustomerId])

    console.log('Auth data', authData)
    console.log('Customer Data', customerData)
    console.log('Orders history', ordersHistory)

    return <div>Orders History</div>
}

export default OrdersHistory
