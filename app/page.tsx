"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";

const App = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, axis: "x" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState({ email: "", phoneNumber: "" });
  const [errors, setErrors] = useState<{ email?: string; phoneNumber?: string }>({});
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const carouselImages = [
    "https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_4246.jpg?v=1779191272",
    "https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_4245.jpg?v=1779191278",
    "https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_4244.jpg?v=1779191278",
  ];

  useEffect(() => {
    if (emblaApi) {
      const autoplayInterval = setInterval(() => emblaApi.scrollNext(), 5000);
      const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      onSelect();
      return () => clearInterval(autoplayInterval);
    }
  }, [emblaApi]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch("/api/email-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const successData = await response.json();
      setSubmitStatus({ success: true, message: successData.message });
       setFormData({ email: "", phoneNumber: "" });
    } else {
      const data = await response.json();
      console.log(data)
      setSubmitStatus({ success: false, message: data.message || "An error occurred. Please try again." });
    }
   
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="order-2 md:order-1 md:w-1/2 flex items-center justify-center p-8 md:p-10">
        <div className="w-full max-w-md flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="WLVE Logo"
            width={230}
            height={50}
            className="w-48 h-48 md:w-64 md:h-64"
          />

          <p className="text-white text-center font-primary text-3xl mb-10">
            Join The WLVE Presale List To Gain Early Access To Drop 001
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5"
            noValidate
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="Email"
                className={`bg-white text-black placeholder-black placeholder:font-primary px-4 py-3 text-sm outline-none border transition-colors duration-200
                    ${errors.email ? "border-red-500" : "border-zinc-800 focus:border-zinc-500"}`}
              />
              {errors.email && (
                <span className="text-red-400 text-xs">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <PhoneInput
                defaultCountry="GB"
                international
                value={formData.phoneNumber}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, phone: value ?? "" }));
                  setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={`phone-input-wrapper border bg-white placeholder-black text-black px-4 py-3 transition-colors duration-200
                    ${errors.phoneNumber ? "border-red-500" : "border-zinc-800 focus-within:border-zinc-500"}`}
              />
              {errors.phoneNumber && (
                <span className="text-red-400 text-xs">{errors.phoneNumber}</span>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 border border-white font-primary text-white font-semibold text-base rounded-md py-4 hover:bg-white hover:border-0 hover:text-black transition-all duration-150"
            >
              SUBMIT
            </button>
          </form>
          {submitStatus.message && (
            <div
              className={`w-fit mt-6 font-primary ${
                submitStatus.success ? " text-green-600" : " text-red-500"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>

      <div className="order-1 md:order-2 md:w-1/2 h-[60vw] max-md:h-[40vh] md:h-screen relative">
        <div className="embla h-full w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] relative h-full"
              >
                <Image
                  src={image}
                  alt={`Carousel image ${index + 1}`}
                  fill
                  sizes=""
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300
                ${selectedIndex === index ? "bg-primary w-12" : "bg-white/40 w-2"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
