export const GETALLPRODUCTS = `
query GetAllProducts(
  $first: Int!
  $after: String
  $country: CountryCode
  $language: LanguageCode
) @inContext(country: $country, language: $language) {
  products(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        description
        media(first: 2) {
          edges {
            node {
              mediaContentType
              alt
              ... on MediaImage {
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              unitPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}`