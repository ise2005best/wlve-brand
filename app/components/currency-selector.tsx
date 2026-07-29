"use client";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useCountryStore } from "../store/country.store";
import * as Flags from "country-flag-icons/react/3x2";

type Country = {
  code: string;
  name?: string;
  currency?: string;
};

type ShippingZonesResponse = {
    countryCodes: string[];
    availableLanguages: string[];
}

const getShippingCountries = async (): Promise<ShippingZonesResponse | null> => {
  try {
    const response = await fetch("/api/shipping-zones");
    if (!response.ok) {
      console.error("Error fetching shipping zones:", await response.text());
      return null;
    }
    return (await response.json()) as ShippingZonesResponse;
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    return null;
  }
};

const ShippingCountriesDropdown = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const setUserCountryStore = useCountryStore((state) => state.setUserCountry);
  const DEFAULT_COUNTRY = "GB"; // Set default country to GB

  // Render flag component dynamically
  const renderFlag = (countryCode: string) => {
    if (!countryCode) return null;

    // The package expects country codes in uppercase format
    const code = countryCode.toUpperCase();

    // Get the flag component from the imported flags
    const FlagComponent = Flags[code as keyof typeof Flags];

    return FlagComponent ? <FlagComponent className="w-6 h-6 mb-1" /> : null;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getShippingCountries();
        console.log(data)
        const countryList = data?.countryCodes.map((code: string) => ({
          code,
        })) || [];
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchUsersIp = async () => {
      const response = await fetch("/api/ip", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("User's IP:", data?.ip);
      setUserCountry(data?.ip);
      setUserCountryStore(data?.ip);
      return data?.ip;
    };

    // Fetch countries and user's IP on component mount
    fetchCountries();
    fetchUsersIp();
  }, [setUserCountryStore]);

  useEffect(() => {
    // Set default country logic
    if (countries.length > 0) {
      // Check if GB is available in the shipping countries
      const isGBAvailable = countries.some(
        (country) => country.code === DEFAULT_COUNTRY,
      );

      if (isGBAvailable) {
        // Set GB as the default country
        // setSelectedCountry(DEFAULT_COUNTRY);
        setUserCountryStore(DEFAULT_COUNTRY);
      } else if (
        userCountry &&
        countries.some((country) => country.code === userCountry)
      ) {
        // Fall back to user's country if GB is not available
        setSelectedCountry(userCountry);
      } else {
        // Fall back to first country if neither GB nor user's country is available
        setSelectedCountry(countries[0]?.code || null);
      }
    }
  }, [countries, userCountry, setUserCountryStore]);

  const handleCountryChange = (country: Country) => {
    setUserCountry(country.code);
    setSelectedCountry(country.code);
    setUserCountryStore(country.code);
  };

  // Find the currently selected country object
  const currentCountry =
    countries.find((country) => country.code === selectedCountry) ||
    countries[0];

  if (countries.length === 0) {
    return null; // Or return a loading state
  }

  return (
    <div className="w-24 relative z-50 bg-[#F7F2F2] px-1 font-secondary ">
      <Listbox value={currentCountry} onChange={handleCountryChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer  px-2 py-3 text-left focus:outline-none flex items-center justify-center gap-2">
            <span className="flex items-center gap-2 truncate text-black text-xl font-secondary ">
              {renderFlag(currentCountry?.code)}
              {currentCountry?.code}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 z-10 mt-0.5 max-h-60 w-24 overflow-auto  bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {countries.map((country) => (
                <Listbox.Option
                  key={country.code}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-3 pr-4 ${
                      active ? "bg-gray-100" : "text-black"
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-2">
                      {renderFlag(country.code)}
                      <span
                        className={`block truncate font-secondary text-lg ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {country.code}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ShippingCountriesDropdown;
