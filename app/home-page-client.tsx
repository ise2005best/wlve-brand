"use client";
import Image from "next/image";
import { AllProducts } from "./graphql/interfaces/all-products.interface";
import ProductCard from "./components/product.card";
const HomePage = ({ products }: { products: AllProducts }) => {
  const productNodes = products.products.edges.map((edge) => edge.node);
  return (
    <div className="bg-white">
      <div className="relative md:h-screen h-[55vh] w-screen bg-white">
        <Image
          src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_5500.jpg?v=1785104283"
          alt="Hero"
          fill
          priority
          className="md:object-cover object-cover"
        />
        <div className="absolute md:bottom-60 bottom-25 inset-x-4 h-full flex flex-col justify-center items-center text-white text-center border-b-2 border-white">
          <div className="flex absolute bottom-0 flex-row w-full justify-between items-center">
            <p className="font-secondary md:text-2xl text-sm uppercase">
              Vibrant
            </p>
            <p className="font-secondary md:text-2xl text-sm uppercase">
              Sun-Kissed
            </p>
            <p className="font-secondary md:text-2xl text-sm uppercase">
              Unforgettable
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <p className="font-primary h-fit w-fit font-light lg:text-[245px] text-8xl uppercase leading-none">
            WLVE
          </p>
        </div>
      </div>
      <div className="mx-6">
        <p className="font-secondary md:text-3xl text-lg uppercase mb-8 text-black leading-none mt-6 ">
            Products
        </p>
        <div className="grid grid-cols-2 md:w-3/4 md:h-[55vh] h-full w-full gap-16 mb-6">
            {productNodes.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
