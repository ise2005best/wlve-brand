"use client";
import { ProductNode } from "../graphql/interfaces/all-products.interface";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: ProductNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, media, handle, variants } = product;

  const imageDetails = media.edges.map((edge) => edge.node.image);
  const mainImage = imageDetails[0]?.url ?? "";
  const hoverImage = imageDetails[1]?.url;
  const unitPrice = variants.edges[0]?.node.unitPrice;
  const price = variants.edges[0]?.node.price;

  if (!mainImage) return null;

  return (
    <div key={id}>
      <div className="w-full sm:w-36 md:w-80 h-full">
        <Link href={`/product/${handle}`}>
          <div className="relative group overflow-hidden w-full h-[30vh] md:h-[50vh]">
            {/* Main Image */}
            <Image
              src={mainImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 240px, 256px"
              className={`object-cover transition-opacity duration-300 ${
                hoverImage ? "group-hover:opacity-0" : ""
              }`}
            />

            {/* Hover Image */}
            {hoverImage && (
              <Image
                src={hoverImage}
                alt={`${title} hover`}
                fill
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            )}
          </div>

          {/* Info */}
          <div className="flex items-center justify-between gap-2 md:px-1 py-2">
            <h2 className="font-secondary-regular text-[10px] md:text-[14px] font-bold text-black md:truncate md:whitespace-nowrap">
              {title}
            </h2>
            <div className="flex flex-col items-end whitespace-nowrap">
              {unitPrice && (
                <p className="font-secondary-regular text-[10px] md:text-[14px] font-bold text-black">
                   {unitPrice.currencyCode} {unitPrice.amount}
                </p>
              )}
              {price && (
                <p className="font-secondary-regular text-[10px] md:text-[14px] font-bold text-black">
                  {price.currencyCode} {price.amount}
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
