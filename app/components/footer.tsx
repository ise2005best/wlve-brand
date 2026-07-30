import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="md:mx-6 mx-3 py-6">
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center mb-10">
        <p className="max-w-xl font-secondary md:text-6xl text-4xl leading-none uppercase">
          For Endless Summer Days.
        </p>
        <div className="flex items-start w-full flex-col md:gap-0 gap-1 mt-8 md:mt-0">
          <p className="font-secondary md:text-3xl text-2xl leading-none uppercase">
            Be a Wlve Girl
          </p>
          <p className="font-secondary-regular md:text-xl text-lg leading-none uppercase">
            Gain Early Access to Drops
          </p>
          <div className="flex flex-row gap-2 w-full mt-4">
            <input
              type="text"
              placeholder="Email@example.com"
              className="px-4 py-2 border md:w-96 w-3/4 focus:outline-none bg-white focus:ring-2 text-black/60 focus:ring-blue-500 uppercase font-secondary-regular text-base"
            />
            <button className="bg-black text-white border border-white md:px-8 px-4 py-2 font-secondary text-base leading-none uppercase hover:bg-gray-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-white py-8 flex flex-row justify-between items-center">
        <Link
          href="/"
          className="font-secondary-regular md:text-lg text-sm leading-none uppercase"
        >
          Wlve
        </Link>
        <p className="font-secondary-light md:text-lg text-sm leading-none uppercase">
          © 2026
        </p>
        <Link
          href="https://x.com/wlve_brand?s=11"
          className="font-secondary-regular md:text-lg text-sm leading-none uppercase"
        >
          Twitter
        </Link>
        <Link
          href="https://www.instagram.com/wlve.brand?igsh=amwxNmhzYnptcmM3"
          className="font-secondary-regular md:text-lg text-sm leading-none uppercase"
        >
          Instagram
        </Link>
        <Link
          href="https://www.tiktok.com/@wlveee.brand?_r=1&_t=ZS-98RDxGeyXRP"
          className="font-secondary-regular md:text-lg text-sm leading-none uppercase"
        >
          Tiktok
        </Link>
      </div>
      <div className="relative md:h-[50vh] h-[25vh]">
        <Image
          src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_5504.jpg?v=1785104283"
          alt="Hero"
          width={1900}
          height={1000}
          priority
          className="md:object-cover h-full object-cover"
        />
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <p className="font-primary h-fit w-fit font-light lg:text-[400px] text-9xl uppercase leading-none">
            WLVE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
