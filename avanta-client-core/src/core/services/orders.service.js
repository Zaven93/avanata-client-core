import axios from 'axios'

export const getOrdersHistory = (key, { customerId }) =>
    axios.get(
        `https://55kj2fiku2.execute-api.us-east-1.amazonaws.com/dev/orders?customerId=${customerId}`
    )
