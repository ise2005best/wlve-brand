export interface OneProduct {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    totalInventory: number;
    vendor: string;
    media: {
      edges: {
        node: {
          alt: string | null;
          image: {
            id: string;
            url: string;
            altText: string | null;
            width: number;
            height: number;
          };
        };
      }[];
    };
    options: {
      id: string;
      name: string;
      optionValues: {
        id: string;
        name: string;
      }[];
    }[];
    variants: Variant;
    metafield1: {
      id: string;
      key: string;
      namespace: string;
      value: string;
      type: string;
    };
    metafield2: {
      id: string;
      key: string;
      namespace: string;
      value: string;
      type: string;
      reference: {
        image: {
          url: string
          altText: string | null
          width: number
          height: number
        }
      }
    } | null;
  };
}

export interface Variant {
  edges: {
    node: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      unitPrice?: {
        amount: string;
        currencyCode: string;
      };
    };
  }[];
}
