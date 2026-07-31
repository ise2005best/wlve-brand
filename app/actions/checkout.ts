"use server";
import shopifyClient from "@/app/utils/shopify";
import { CART_CREATE } from "@/app/graphql/cartCreate";
import { CartCreateResponse } from "@/app/graphql/interfaces/cart-create.interface";

export type CheckoutLine = {
  merchandiseId: string;
  quantity: number;
};

export async function createCheckout(lines: CheckoutLine[]) {
  const { data, errors } = await shopifyClient.request<CartCreateResponse>(
    CART_CREATE,
    { variables: { lines } },
  );

  if (errors) {
    throw new Error("Failed to create checkout");
  }

  const { cart, userErrors } = data!.cartCreate;
  if (userErrors.length > 0 || !cart) {
    throw new Error(userErrors[0]?.message ?? "Failed to create checkout");
  }

  return cart;
}
