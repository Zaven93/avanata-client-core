import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { useVerifyAuth, useGetCustomer } from '../core/hooks'

const QrGenerator = () => {
    const [shopifyId, setShopifyId] = useState('')
    const [showQrCode, setShowQrCode] = useState(false)

    const { verifyAuth, data: authData, error: authError } = useVerifyAuth()
    const { customerByPhone, data: customerData } = useGetCustomer()

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
        setShopifyId(customerData.data.data.userByPhone.items[0].shopifyCustomerId)
    }, [customerData])

    console.log('Phone number', authData && authData.attributes.phone_number)
    console.log('Verified Auth Data', authData)
    console.log('Customer by phone data', customerData)
    console.log('Shopify id', shopifyId)

    return (
        <>
            <div>QR Code Generator</div>
            <button onClick={() => setShowQrCode(true)}>Generate QR code</button>
            {showQrCode && shopifyId ? (
                <QRCode value={shopifyId} />
            ) : (
                <p>You haven't received Shopify Id</p>
            )}
        </>
    )
}

export default QrGenerator
