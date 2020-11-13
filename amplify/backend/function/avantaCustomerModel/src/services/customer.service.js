module.exports.createCustomer = /* GraphQL */ `
    mutation CreateCustomer($input: CustomerInput!) {
        customerCreate(input: $input) {
            customer {
                firstName
                lastName
                phone
                id
            }
        }
    }
`

module.exports.createDynamoDBCustomer = /* GraphQL */ `
    mutation CreateDynamoDBCustomer($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            surname
            phone_number
            balance
            bonusHistory
            createdAt
            orderHistory
            shopifyCustomerId
            updatedAt
        }
    }
`

module.exports.getCustomerByPhone = /* GraphQL */ `
    query getCustomerByPhone($phone_number: String) {
        userByPhone(phone_number: $phone_number) {
            items {
                name
                phone_number
                surname
                shopifyCustomerId
            }
        }
    }
`
