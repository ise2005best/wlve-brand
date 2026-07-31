import type { Metadata } from "next";
import { cache } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import shopifyClient from "@/app/utils/shopify";
import { SITE_NAME, SITE_URL } from "@/app/utils/site";
import { GET_ONE_PRODUCT } from "@/app/graphql/getOneProduct";
import { OneProduct } from "@/app/graphql/interfaces/one-product.interface";
import ProductClient from "./product.client";

// Cached the request so generateMetadata and the page itself share a single request.

const getProduct = cache(async (handle: string, country: string) => {
  const { data, errors } = await shopifyClient.request<OneProduct>(
    GET_ONE_PRODUCT,
    {
      variables: { handle, country, language: "EN" },
    },
  );

  if (errors || !data?.product) return null;
  return data;
});

const getCountry = cache(async () => {
  const cookieStore = await cookies();
  const cookieCountry = cookieStore.get("country")?.value;
  return cookieCountry && cookieCountry !== "null" ? cookieCountry : "GB";
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getProduct(id, await getCountry());
  const product = data?.product;

  if (!product) {
    return { title: "Product Not Found" };
  }

  const description =
    product.description?.trim().slice(0, 160) ||
    `Shop ${product.title} from ${SITE_NAME}.`;
  const image = product.media.edges[0]?.node.image?.url;
  const path = `/product/${product.handle}`;

  return {
    title: product.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: product.title,
      description,
      url: path,
      images: image ? [{ url: image, alt: product.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct(id, await getCountry());

  if (!data) {
    notFound();
  }

  const product = data.product;
  const variants = product.variants.edges.map((edge) => edge.node);
  const images = product.media.edges
    .map((edge) => edge.node.image?.url)
    .filter(Boolean);
  const inStock = product.totalInventory > 0;
  const productUrl = `${SITE_URL}/product/${product.handle}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images,
    brand: {
      "@type": "Brand",
      name: product.vendor || SITE_NAME,
    },
    ...(product.productType ? { category: product.productType } : {}),
    offers: variants.map((variant) => ({
      "@type": "Offer",
      name: variant.title,
      sku: variant.id,
      url: productUrl,
      price: variant.price.amount,
      priceCurrency: variant.price.currencyCode,
      itemCondition: "https://schema.org/NewCondition",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <ProductClient product={data} />
    </div>
  );
}
