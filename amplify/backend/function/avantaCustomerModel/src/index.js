const axios = require('axios')
const shopifyRequest = require('./helpers/shopifyRequest')
const appSyncRequest = require('./helpers/appSyncRequest')
const ServicesService = require('./services/services.service')
const CustomerService = require('./services/customer.service')
const { sendResponse } = require('./helpers/build')

exports.handler = (event) => {
    console.log('Returned event', JSON.stringify(event))

    //Handling logic for a customer received from the client
    if (event.path === '/customer') {
        if (event.httpMethod === 'GET') {
            const phone_number = `+${event.queryStringParameters.phone_number}`

            console.log('Updated phone number', phone_number)

            return appSyncRequest(CustomerService.getCustomerByPhone, { phone_number }).then(
                (customerByPhone) => {
                    console.log('Customer by Phone number', customerByPhone)

                    return sendResponse(customerByPhone)
                }
            )
        }

        const { name, surname, phone_number } = JSON.parse(event.body)

        console.log(`Name: ${name}, Surname: ${surname}, Phone: ${phone_number}`)

        shopifyRequest(CustomerService.createCustomer, {
            input: {
                firstName: name,
                lastName: surname,
                phone: phone_number
            }
        })
            .then((customer) => {
                console.log('Customer data from shopify', JSON.stringify(customer.data))
                const shopifyCustomerId = customer.data.data.customerCreate.customer.id
                return appSyncRequest(CustomerService.createDynamoDBCustomer, {
                    input: {
                        name,
                        surname,
                        phone_number,
                        shopifyCustomerId
                    }
                })
            })
            .then((dynamoDBCustomer) => {
                console.log('Customer data', dynamoDBCustomer)

                return sendResponse(dynamoDBCustomer)
            })
            .catch((e) => console.log(e))
    }

    if (event.path === '/services') {
        return shopifyRequest(ServicesService.getServices)
            .then((services) => {
                console.log('Services data', JSON.stringify(services.data))
                return sendResponse(services)
            })
            .catch((e) => console.log(e))
    }

    if (event.path === '/blogs') {
        return shopifyRequest(null, null, 'blogs')
            .then((blogs) => {
                console.log('Blogs data', blogs.data)
                return sendResponse(blogs)
            })
            .catch((e) => console.log(e))
    }

    return sendResponse(event)
}
