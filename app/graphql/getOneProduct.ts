export const GET_ONE_PRODUCT = `
query GetFullProduct(
  $handle: String!
  $country: CountryCode
  $language: LanguageCode
) @inContext(country: $country, language: $language) {
  product(handle: $handle) {
    id
    title
    handle
    description
    productType
    vendor
    tags
    totalInventory
    media(first: 20) {
      edges {
        node {
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
    options {
      id
      name
      optionValues{
        id
        name
      }
    }
    # Variants
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
    # Metafields
    metafield1: metafield(namespace: "custom", key: "product_details") {
      id
      key
      namespace
      value
      type
    }
    metafield2: metafield(namespace: "custom", key: "size_guide") {
      id
      key
      namespace
      value
      type
        reference {
    ... on MediaImage {
      image {
        url
        altText
        width
        height
      }
    }
  }
    }
  }
}`;
