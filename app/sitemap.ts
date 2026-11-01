import { MetadataRoute } from "next";
import type { ClientResponse } from "@shopify/storefront-api-client";
import { GET_ALL_PRODUCT_HANDLES } from "./graphql/getProductHandles";
import {
  AllProductHandles,
  ProductHandleNode,
} from "./graphql/interfaces/product-handles.interface";
import shopifyClient from "./utils/shopify";
import { SITE_URL as BASE_URL } from "./utils/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "daily", priority: 1 },
    {
      url: `${BASE_URL}/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productNodes: ProductHandleNode[] = [];
  let after: string | null = null;

  try {
    do {
      const response: ClientResponse<AllProductHandles> =
        await shopifyClient.request<AllProductHandles>(
          GET_ALL_PRODUCT_HANDLES,
          { variables: { first: 250, after } },
        );

      const data = response.data;
      if (response.errors || !data) break;

      productNodes.push(...data.products.edges.map((edge) => edge.node));

      after = data.products.pageInfo.hasNextPage
        ? data.products.pageInfo.endCursor
        : null;
    } while (after);
  } catch (error) {
    // Still emit the static routes if Shopify is unreachable.
    console.error("Failed to fetch product handles for sitemap:", error);
  }

  const productRoutes: MetadataRoute.Sitemap = productNodes.map((product) => ({
    url: `${BASE_URL}/product/${product.handle}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
