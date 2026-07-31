export interface ProductHandleNode {
  handle: string;
  updatedAt: string;
}

export interface AllProductHandles {
  products: {
    edges: {
      node: ProductHandleNode;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}
