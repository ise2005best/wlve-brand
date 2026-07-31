import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="md:mx-6 mx-3 py-6">
      <div className="flex lg:flex-row flex-col w-full justify-between items-start lg:items-center mb-10">
        <p className="max-w-xl font-secondary lg:text-6xl md:text-5xl text-3xl leading-none uppercase">
          For Endless Summer Days.
        </p>
        <div className="flex items-start w-full lg:w-fit flex-col md:gap-1 gap-1 mt-8 lg:mt-0">
          <div>
            <p className="font-secondary md:text-3xl text-2xl leading-none uppercase">
              Be a Wlve Girl
            </p>
          </div>

          <p className="font-secondary-regular md:text-xl text-lg leading-none uppercase">
            Gain Early Access to Drops
          </p>
          <div className="flex flex-row gap-2 w-full mt-4">
            <input
              type="text"
              placeholder="Email@example.com"
              className="px-4 py-2 border lg:w-96 md:w-1/2 flex-1 min-w-0 focus:outline-none bg-white focus:ring-2 text-black/60 focus:ring-blue-500 uppercase font-secondary-regular text-base"
            />
            <button className="bg-black text-white border border-white shrink-0 md:px-8 px-4 py-2 font-secondary text-base leading-none uppercase hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-white md:py-8 py-6 flex flex-row flex-wrap gap-y-3 justify-between items-center">
        <Link
          href="/"
          className="font-secondary-regular lg:text-lg md:text-base text-sm leading-none uppercase"
        >
          Wlve
        </Link>
        <p className="font-secondary-light lg:text-lg md:text-base text-sm leading-none uppercase">
          © 2026
        </p>
        <Link
          href="https://x.com/wlve_brand?s=11"
          className="font-secondary-regular lg:text-lg md:text-base text-sm leading-none uppercase"
        >
          Twitter
        </Link>
        <Link
          href="https://www.instagram.com/wlve.brand?igsh=amwxNmhzYnptcmM3"
          className="font-secondary-regular lg:text-lg md:text-base text-sm leading-none uppercase"
        >
          Instagram
        </Link>
        <Link
          href="https://www.tiktok.com/@wlveee.brand?_r=1&_t=ZS-98RDxGeyXRP"
          className="font-secondary-regular lg:text-lg md:text-base text-sm leading-none uppercase"
        >
          Tiktok
        </Link>
      </div>
      <div className="relative lg:h-[50vh] md:h-[40vh] h-[25vh]">
        <Image
          src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_5504.jpg?v=1785104283"
          alt="Hero"
          width={1900}
          height={1000}
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
          <p className="font-primary text-center font-light lg:text-[400px] md:text-[220px] text-9xl uppercase leading-none">
            WLVE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
