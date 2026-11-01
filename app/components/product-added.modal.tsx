"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCheckout } from "../actions/checkout";

interface ProductAddedProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  variantId: string;
  quantity: number;
  productName: string;
  imageUrl: string;
  clearCart: () => void;
}

export const ProductAddedModal = ({
  isOpen,
  setIsOpen,
  productName,
  imageUrl,
  variantId,
  quantity,
  clearCart,
}: ProductAddedProps) => {
  const checkoutMutation = useMutation({
    mutationFn: () =>
      createCheckout([
        {
          merchandiseId: variantId,
          quantity: quantity,
        },
      ]),
    onSuccess: (cart) => {
      window.location.href = cart.checkoutUrl;
      clearCart(); 
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => setIsOpen(false), 3000);
    return () => clearTimeout(timeout);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 left-3 top-21 md:top-25 w-[calc(100%-1.5rem)] md:w-lg bg-black text-white">
        <div className="flex flex-row gap-4 p-4">
          <div className="relative w-20 md:w-24 shrink-0 bg-white/10 aspect-9/12">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={productName}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <div className="flex flex-row justify-between items-center gap-2">
              <p className="font-secondary-regular md:text-xl text-sm capitalize">
                Product added to cart
              </p>
              <span className="h-px md:w-10 w-8 shrink-0 bg-white" />
            </div>

            <p className="font-secondary-regular md:text-base text-sm text-white/70 truncate">
              {productName}
            </p>

            {checkoutMutation.isError && (
              <p className="font-secondary-regular text-xs text-red-400">
                {checkoutMutation.error.message}
              </p>
            )}

            <div className="flex flex-row gap-2 mt-1">
              <button
                type="button"
                onClick={() => (window.location.href = "/cart")}
                className="bg-white text-black md:px-8 px-3 capitalize py-2 font-secondary-regular md:text-base text-xs leading-none hover:bg-white/80 transition-colors"
              >
                Proceed to cart
              </button>
              <button
                type="button"
                onClick={() => checkoutMutation.mutate()}
                disabled={checkoutMutation.isPending}
                className="bg-black text-white border border-white md:px-3 px-4 py-2 font-secondary-regular md:text-base text-xs leading-none hover:bg-white/10 transition-colors disabled:opacity-60"
              >
                {checkoutMutation.isPending ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductAddedModal;
