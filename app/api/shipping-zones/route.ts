import { NextResponse } from "next/server";
import shopifyClient from "../../utils/shopify";
import { GETALLSHIPPINGZONES } from "../../graphql/shipping-zones";
import { ShippingZones } from "../../graphql/interfaces/shipping-zones.interface";

export async function GET() {
  const { data, errors } = await shopifyClient.request(GETALLSHIPPINGZONES);

  if (errors) {
    console.error("Error fetching shipping zones:", errors);
    return NextResponse.json(
      { error: "Failed to fetch shipping zones" },
      { status: 500 },
    );
  }

  const response = data as ShippingZones;
  const countryCodes =
    response?.localization.availableCountries.map(
      (country) => country.isoCode,
    ) || [];
  const availableLanguages =
    response?.localization.availableCountries
      .map((country) => country.availableLanguages.map((lang) => lang.isoCode))
      .flat() || [];

  return NextResponse.json({ countryCodes, availableLanguages });
}
