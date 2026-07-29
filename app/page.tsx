import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "./home-page-client";
import shopifyClient from "./utils/shopify";
import { GETALLPRODUCTS } from "./graphql/getAllProducts";
import { AllProducts } from "./graphql/interfaces/all-products.interface";

export const metadata: Metadata = {
  title: "Shop WLVE Swimwear Products",
  description:
    "Discover our latest collection of swimwear products for every occasion.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shop WLVE Swimwear Products",
    description:
      "Discover our latest collection of swimwear products for every occasion.",
    url: "/",
  },
};

export default async function AllProductsPage() {
  const { data, errors } = await shopifyClient.request(GETALLPRODUCTS, {
    variables: {
      first: 10,
      after: null,
      country: "US",
      language: "EN",
    },
  });
  const products: AllProducts = data?.products;

  if (errors) {
    notFound();
  }

  return <HomePage products={products} />;
}
