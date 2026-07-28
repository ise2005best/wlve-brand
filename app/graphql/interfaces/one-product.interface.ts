export interface OneProduct {
    product: {
        id: string;
        title: string;
        handle: string;
        description: string;
        productType: string;
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
                    }
                }
            }[]
        }
        options: {
            id: string;
            name: string;
            optionValues: {
                id: string;
                name: string;
            }
        }[]
        variants: {
            edges: {
                node: {
                    id: string;
                    title: string;
                    price: {
                        amount: string;
                        currencyCode: string;
                    }
                    unitPrice?: {
                        amount: string;
                        currencyCode: string;
                    }
                }
            }[]
        }
        metafield1: {
            id: string;
            key: string;
            namespace: string;
            value: string;
            type: string;
        }
    }
}