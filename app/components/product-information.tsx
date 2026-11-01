"use client";
import { Minus, Plus, X } from "lucide-react";
import { OneProduct } from "../graphql/interfaces/one-product.interface";
import { BsPlus } from "react-icons/bs";
import { GoDash } from "react-icons/go";
import { useState } from "react";
import Image from "next/image";
import { cartProps } from "@/app/store/cart.interface";
import { useCartStore } from "@/app/store/cart.store";
import { formatPrice } from "@/app/utils/format.naira";
import ProductAddedModal from "./product-added.modal";

export interface InfoPanelProps {
  product: OneProduct;
  price: string;
  selectedVariantId: string | null;
  openSection: string | null;
  onToggleAccordion: (id: string) => void;
  onSelectVariant: (variantId: string) => void;
}

const ProductInformation = ({
  product,
  price,
  selectedVariantId,
  openSection,
  onToggleAccordion,
  onSelectVariant,
}: InfoPanelProps) => {
  const productDetails = product.product;
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    productDetails.variants.edges[0].node.title,
  );
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, updateItemQuantity, clearCart } = useCartStore();
  const sizeGuideImage = productDetails?.metafield2?.reference?.image;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    if (selectedVariantId) {
      updateItemQuantity(selectedVariantId, quantity);
    }
  };
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
    if (selectedVariantId) {
      updateItemQuantity(selectedVariantId, quantity);
    }
  };

  const cartItem: cartProps = {
    id: productDetails?.id || "",
    productName: productDetails?.title || "",
    currencyCode:
      productDetails?.variants.edges[0]?.node.price.currencyCode || "",
    quantity: quantity,
    price: parseInt(price),
    variant: selectedVariant,
    variantId: selectedVariantId || "",
    vendor: productDetails?.vendor || "",
    productId: productDetails?.id || "",
    // use the first image as the main image
    imageUrl: productDetails?.media.edges[1]?.node.image.url || "",
  };

  const addItemToCart = () => {
    setIsModalOpen(true);
    addToCart(cartItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  let productDetailsContent: string | string[] =
    productDetails?.metafield1?.value || "No product details available.";
  try {
    const parsed = JSON.parse(productDetailsContent);
    if (Array.isArray(parsed)) {
      productDetailsContent = parsed;
    }
  } catch {
    // Not JSON — render the raw metafield value as plain text.
  }

  const sections = [
    {
      id: "description",
      label: "Description",
      content: productDetails?.description || "No description available.",
    },
    {
      id: "details",
      label: "Product Details",
      content: productDetailsContent,
    },
    {
      id: "shipping",
      label: "Delivery & Shipping",
      content:
        "We offer worldwide shipping. Orders are processed within 1-3 business days and arrive within 5-10 business days depending on your location. Returns accepted within 14 days of delivery, return shipping is paid by the customer.",
    },
  ];

  return (
    <div className="w-full  text-left">
      <h1 className="text-xl md:text-5xl font-secondary-regular font-light text-black tracking-wide leading-snug md:mb-4 mb-2">
        {productDetails?.title}
      </h1>

      <p className="text-base md:text-3xl font-secondary text-black mb-3 tracking-wide">
        {formatPrice(
          price,
          productDetails?.variants.edges[0]?.node.price.currencyCode ?? "",
        )}
      </p>

      <div className="bg-black h-px md:my-6 my-2 w-full" />

      {productDetails?.options.length > 0 &&
        productDetails.options.map((option) => (
          <div key={option.id} className="mb-6 mt-3">
            <div className="flex items-center justify-between mb-2">
              <p className="md:text-xl text-base font-secondary-regular text-[#010101]/60">
                {option.name}:
              </p>
              {option.name.toLowerCase() === "size" && sizeGuideImage && (
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="md:text-md text-sm font-secondary-regular capitalize underline text-[#010101]/60 hover:text-[#010101]"
                >
                  View Size Guide
                </button>
              )}
            </div>
            <div className="flex flex-row justify-start md:gap-12 gap-8">
              {option.optionValues.map((value) => {
                const matchingVariant = productDetails.variants.edges.find(
                  ({ node }) => node.title === value.name,
                );
                return (
                  <button
                    key={value.id}
                    onClick={() => {
                      if (matchingVariant) {
                        onSelectVariant(matchingVariant.node.id);
                        setSelectedVariant(matchingVariant.node.title);
                      }
                    }}
                    className={[
                      "px-7 py-1.5 border font-tertiary text-base rounded-md uppercase transition-all duration-150",
                      selectedVariantId === matchingVariant?.node.id
                        ? "bg-[#1a1108] text-white border-[#1a1108]"
                        : "bg-white border-[#1a1108] text-black",
                    ].join(" ")}
                  >
                    {value.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      <div className="flex flex-row gap-4 items-center justify-center mb-4">
        <div className="flex flex-col space-y-4 border bg-[#010101]/10 rounded-md px-6 py-2 ">
          <div className="flex   justify-between space-x-6  w-fit">
            <button className="cursor-pointer" onClick={decreaseQuantity}>
              <Minus className="text-black w-3 h-3" />
            </button>
            <span className="font-secondary-regular font-extrabold md:text-base text-sm text-black">
              {quantity}
            </span>
            <button className="cursor-pointer" onClick={increaseQuantity}>
              <Plus className="text-black w-3 h-3" />
            </button>
          </div>
        </div>
        <button
          className={`w-full py-2 rounded-md text-white md:text-lg text-base font-secondary-regular font-semibold transition-colors duration-200 ${
            isAdded ? "bg-green-600" : "bg-black hover:bg-secondary"
          }`}
          disabled={productDetails.totalInventory === 0}
          onClick={addItemToCart}
        >
          {isAdded
            ? "Product Added to Cart"
            : productDetails.totalInventory === 0
              ? "OUT OF STOCK"
              : "Add To Cart"}
        </button>
      </div>

      <div className="border-t border-black">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-black">
            <button
              onClick={() => onToggleAccordion(section.id)}
              className="w-full flex justify-between items-center py-3 text-sm text-[#1a1108] font-medium uppercase"
            >
              <span className=" font-secondary-regular text-base">
                {section.label}
              </span>
              {openSection === section.id ? (
                <GoDash className="w-6 h-6 text-secondary transition-transform duration-200" />
              ) : (
                <BsPlus className="w-6 h-6 text-secondary transition-transform duration-200" />
              )}
            </button>
            {openSection === section.id && (
              <div className="pb-5 md:text-[13px] text-[10px] text-gray-500 leading-relaxed tracking-wide text-left">
                {Array.isArray(section.content) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {section.content.map((item: string, i: number) => (
                      <li
                        className="font-secondary-regular text-sm text-[#010101]/80"
                        key={i}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-secondary-regular text-sm text-[#010101]/80">
                    {section.content}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showSizeGuide && sizeGuideImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] bg-white"
            style={{
              aspectRatio: `${sizeGuideImage.width}/${sizeGuideImage.height}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              aria-label="Close size guide"
              className="absolute -top-10 right-0 text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={sizeGuideImage.url}
              alt={sizeGuideImage.altText ?? "Size guide"}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      <ProductAddedModal
        imageUrl={
          productDetails.media.edges[1]?.node.image?.url ?? "/placeholder.jpg"
        }
        productName={productDetails.title}
        variantId={selectedVariantId || ""}
        quantity={quantity}
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        clearCart={clearCart}
      />
    </div>
  );
};

export default ProductInformation;
