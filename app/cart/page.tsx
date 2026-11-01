"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/app/store/cart.store";
import { createCheckout } from "@/app/actions/checkout";
import { formatPrice } from "@/app/utils/format.naira";

const CartPage = () => {
  const { cartItems, updateItemQuantity, removeItem, clearCart } = useCartStore();
    const currencyCode = cartItems[0]?.currencyCode || "";

  const estimatedTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const checkoutMutation = useMutation({
    mutationFn: () =>
      createCheckout(
        cartItems.map((item) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        })),
      ),
    onSuccess: (cart) => {
      window.location.href = cart.checkoutUrl;
      clearCart(); 
    },
  });

  return (
    <div className="min-h-[60vh] bg-[#F7F2F2] px-4 md:px-12 py-24 md:py-38">
      <div className="flex flex-row justify-between items-center mb-10 md:mb-16">
        <h1 className="font-secondary text-3xl md:text-5xl text-black">
          Your Cart
        </h1>
        <Link
          href="/"
          className="font-secondary-regular text-sm md:text-base underline text-black"
        >
          Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <p className="font-secondary-regular text-base text-black/60">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-[3fr_2fr_1fr] lg:grid-cols-[600px_220px_1fr] gap-2 md:gap-4 items-center border-b border-black/20 pb-3 mb-2">
            <span className="font-secondary-regular text-xs md:text-sm uppercase text-black/50">
              Product
            </span>
            <span className="font-secondary-regular text-xs md:text-sm uppercase text-black/50 text-center">
              Quantity
            </span>
            <span className="font-secondary-regular text-xs md:text-sm uppercase text-black/50 text-right">
              Total
            </span>
          </div>

          <div>
            {cartItems.map((item) => (
              <div
                key={item.variantId}
                className="grid grid-cols-[3fr_2fr_1fr] lg:grid-cols-[600px_220px_1fr] items-center gap-2 md:gap-4 border-b border-black/20 py-4 md:py-6"
              >
                <div className="flex flex-row gap-2 md:gap-4 items-center min-w-0">
                  <div
                    className="relative w-24 md:w-32 lg:w-52 shrink-0 bg-black/10"
                    style={{ aspectRatio: "9/12" }}
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="md:min-w-0">
                    <p className="font-secondary text-md md:text-xl uppercase text-black wrap-break-word">
                      {item.productName}
                    </p>
                    <p className="font-secondary-regular text-sm md:text-base text-black/60 mt-1">
                      {formatPrice(item.price, item.currencyCode)}
                    </p>
                    <p className="font-secondary-regular text-sm md:text-base text-black/60">
                      Size: {item.variant}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-center md:gap-8 gap-3">
                  <div className="flex flex-col space-y-4 border bg-[#010101]/10 rounded-md md:px-6 px-3 py-2 ">
                    <div className="flex justify-between md:space-x-5 space-x-2  w-fit">
                      <button
                        type="button"
                        onClick={() =>
                          updateItemQuantity(item.productId, item.quantity - 1)
                        }
                        className="cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="text-black w-3 h-3" />
                      </button>
                      <span className="font-secondary-regular font-extrabold md:text-base text-sm text-black">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateItemQuantity(item.productId, item.quantity + 1)
                        }
                        className="cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="text-black w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    aria-label="Remove item"
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-black/60 hover:text-black" />
                  </button>
                </div>

                <span className="font-secondary-regular text-base md:text-lg text-black text-right">
                  {formatPrice(item.price * item.quantity, item.currencyCode)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-end mt-10 gap-2">
            <div className="flex flex-row gap-6 items-center">
              <span className="font-secondary-regular text-base md:text-lg text-black">
                Estimated Total:
              </span>
              <span className="font-secondary text-lg md:text-xl text-black">
                {formatPrice(estimatedTotal, currencyCode)}
              </span>
            </div>
            <p className="font-secondary-regular text-xs md:text-sm text-black/50 text-right max-w-xs">
              Taxes, discounts and shipping calculated at checkout
            </p>
            {checkoutMutation.isError && (
              <p className="font-secondary-regular text-sm text-red-600 text-right max-w-xs">
                {checkoutMutation.error.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => checkoutMutation.mutate()}
              disabled={checkoutMutation.isPending}
              className="mt-4 bg-black text-white font-secondary-regular text-base md:text-lg capitalize px-18 py-3 rounded-md hover:bg-secondary transition-colors duration-200 disabled:opacity-60"
            >
              {checkoutMutation.isPending
                ? "Processing..."
                : "Proceed To Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
