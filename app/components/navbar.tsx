"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "Cart" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="w-lg bg-black absolute z-50 mx-3 my-3 ">
      <div className="flex w-full px-2 flex-row justify-between items-center ">
        <Image
          src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/Logo.png_1.png?v=1785324772"
          alt="Logo"
          width={100}
          height={100}
          className="md:w-20 md:h-20 object-contain "
        />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="mr-2"
        >
          {isOpen ? (
            <div className="relative mr-4 h-6 w-12">
              <span className="absolute right-0 top-1/2 h-px w-12 -translate-y-1/2 bg-white" />
            </div>
          ) : (
            <Image
              src="/assets/image.png"
              alt="Menu"
              width={100}
              height={100}
              className="md:w-8 md:h-6 text-white"
            />
          )}
        </button>
      </div>

      <div
        className={`flex flex-col gap-6 px-4 text-white overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-2xl py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <div key={href} className="relative flex items-center">
                {isActive && (
                  <span className="absolute right-0 h-px w-48 bg-white" />
                )}
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="font-secondary-regular uppercase md:text-3xl text-xl"
                >
                  {label}
                </Link>
              </div>
            );
          })}
          <div className="mt-10">
            <p className="font-secondary-regular uppercase text-white text-sm md:text-base">
                With Love
            </p>
            <Image
            src="https://cdn.shopify.com/s/files/1/1047/8305/3145/files/IMG_4246.jpg?v=1779191272"
            alt="Logo"
            width={2500}
            height={2500}
            className="md:w-full md:h-80 object-cover mt-6"
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
