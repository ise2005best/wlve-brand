export interface AllProducts {
    products: {
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string | null;
        }
        edges:{
            node: {
                id: string;
                title: string;
                handle: string;
                description: string;
                media: {
                    edges:{
                        node: {
                            mediaContentType: string;
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
                variant: {
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
            }
        }
    }
}