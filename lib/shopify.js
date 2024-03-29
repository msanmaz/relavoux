
const domain = process.env.NEXT_PUBLIC_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_STOREFRONT_ACCESS

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-10/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json()
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getCollection() {
  const query = `
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          createdAt
          updatedAt
          description
          descriptionHtml
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                sku
              }
            }
          }
        }
      }
    }
  }
  `

  const response = await ShopifyData(query)

  const allProducts = response?.data?.collections?.edges ? response.data.collections.edges : []

  return allProducts
}

export async function getProductsInCollection() {
  const query = `
  {
    collections(first: 10) {
      edges {
        node {
          title
        }
      }
    }
  }
  
  `

  const response = await ShopifyData(query)

  const allProducts = response?.data?.collections?.edges ? response.data.collections.edges : []

  return allProducts
}


// "node": {
 // "handle": "short-sleeve-t-shirt",
 // "id": "gid://shopify/Product/8375986487576"} returns this 
export async function getAllProducts() {
  const query =
    `{
    products(first: 250) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const slugs = response.data.products.edges ? response.data.products.edges : []

  return slugs
}

export async function getProduct(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  totalInventory
                  images(first: 5) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      Material: metafield(namespace: "custom", key: "product_material") {
        value
      }
      Type: metafield(namespace: "custom", key: "product_type") {
        value
      }
      Country: metafield(namespace: "custom", key: "product_country") {
        value
      }
      Size: metafield(namespace: "custom", key: "product_size") {
        value
      }
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const product = response.data.productByHandle ? response.data.productByHandle : []

  return product
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`

  const response = await ShopifyData(query)
  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []

  return checkout
}




export async function createCustomer(signup) {
  const query = `
  mutation customerCreate($input: CustomerCreateInput = {firstName: "${signup.firstName}", lastName: "${signup.lastName}", email: "${signup.email}", phone:"${signup.phone}", password: "${signup.password}", acceptsMarketing: true}) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }`

  const response = await ShopifyData(query)
  return response
}

export async function createCustomerAccessToken(token) {
  console.log(token)
  const query = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput = {email:"${token.email}", password:"${token.password}"}) {
  customerAccessTokenCreate(input: $input) {
    customerUserErrors {
      code
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
  }
}
`
  const response = await ShopifyData(query)
  return response
}


export async function getCustomerInfo(accessToken) {
  const query = `
  query {
    customer(customerAccessToken: "${accessToken}") {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }
  `
  const response = await ShopifyData(query)
  const user = response.data.customer ? response.data.customer : []
  return user

}



export async function updateCheckout(id, lineItems) {
  console.log(lineItems, 'lineitems')
  const lineItemsObject = lineItems.map(item => {
    return `{
      variantId:"${item.variantId}",
      quantity:${item.quantity}
    }`
  })
  console.log(lineItemsObject, 'object')
  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  console.log('response', response)
  const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []

  return checkout
}




export async function recursiveCatalog(cursor = '',) {
  let data;

  if (cursor !== '') {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  }
}