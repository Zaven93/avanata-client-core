import axios from 'axios'
import Storage from '@aws-amplify/storage'

Storage.configure({
    track: true,
    level: 'private'
})

const customerBaseUrl = 'https://55kj2fiku2.execute-api.us-east-1.amazonaws.com/dev/customer'

export const createCustomer = ({ name, surname, phone_number }) =>
    axios({
        url: customerBaseUrl,
        method: 'POST',
        data: {
            name,
            surname,
            phone_number
        }
    })

export const uploadAvatar = (e) =>
    Storage.put('profilePicture.png', e.target.files[0], {
        contentType: 'image/png'
    })

export const getAvatar = () => Storage.get('profilePicture.png')

export const getCustomer = ({ phone_number }) =>
    axios.get(
        `https://55kj2fiku2.execute-api.us-east-1.amazonaws.com/dev/customer?phone_number=${phone_number.slice(
            1
        )}`
    )
