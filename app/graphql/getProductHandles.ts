export const GET_ALL_PRODUCT_HANDLES = `
query getAllProductHandles($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    edges {
      node {
        handle
        updatedAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
