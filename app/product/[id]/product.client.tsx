"use client";
import { OneProduct } from "@/app/graphql/interfaces/one-product.interface";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import ProductInformation, { InfoPanelProps } from "@/app/components/product-information";
import { useState, useEffect } from "react";

const ProductClient = ({ product }: { product: OneProduct }) => {
  const productDetails = product.product;
  const [selectedVariantId, setselectedVariantId] = useState<string>(
    productDetails.variants.edges[0].node.id,
  );
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const images = productDetails.media.edges.slice(1);
  const price = productDetails.variants.edges[0].node.price.amount;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    let autoplayInterval: NodeJS.Timeout;

    const startAutoplay = setTimeout(() => {
      autoplayInterval = setInterval(() => emblaApi.scrollNext(), 5000);
    }, 3000);

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      clearTimeout(startAutoplay);
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [emblaApi]);

    const sharedProps: InfoPanelProps = {
    product,
    price,
    selectedVariantId,
    openSection: openAccordion,
    onToggleAccordion: (id) =>
      setOpenAccordion((prev) => (prev === id ? null : id)),
    onSelectVariant: setselectedVariantId,
  };

  return (
    <div className="bg-white ">
      <div></div>
      {/* ── MOBILE only ── */}
      <div className="md:hidden flex flex-col">
        <div className="relative overflow-hidden w-full h-[75vh]">
          <div className="embla h-full w-full" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {images.map((image, index) => (
                <div
                  className="embla__slide flex-[0_0_100%] relative h-full"
                  key={image.node.image?.id ?? index}
                >
                  <Image
                    src={image.node.image?.url ?? "/placeholder.jpg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "bg-secondary w-8"
                    : "bg-white/75 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-5 py-8">
          <ProductInformation {...sharedProps} />
        </div>
      </div>

      {/* ── DESKTOP only ── */}
      <div className="hidden md:flex flex-col">
        <div className="flex items-start">
          <div className="flex-1 min-w-0">
            {images.length > 0 ? (
              images.map(({ node }, index) => (
                <div
                  key={index}
                  className="relative w-full"
                  style={{ aspectRatio: "4/5" }}
                >
                  <Image
                    src={node.image?.url ?? "/placeholder.jpg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="60vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))
            ) : (
              <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/placeholder.jpg"
                  alt="Product"
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="w-0.5 bg-secondary self-stretch shrink-0" />

          <div className="w-[40%] shrink-0 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto">
            <div className="p-8 m-4">
              <ProductInformation {...sharedProps} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductClient;
