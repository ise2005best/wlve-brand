export interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}
