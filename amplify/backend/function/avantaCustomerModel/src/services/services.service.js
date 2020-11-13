module.exports.getServices = /* GraphQL */ `
    query Products {
        products(first: 50) {
            edges {
                node {
                    id
                    productType
                    title
                    tags
                    metafields(first: 10) {
                        edges {
                            node {
                                id
                                namespace
                                key
                                value
                            }
                        }
                    }
                    variants(first: 1) {
                        edges {
                            node {
                                price
                            }
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                originalSrc
                            }
                        }
                    }
                }
            }
        }
    }
`
