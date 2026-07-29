export interface ShippingZones {
    localization: {
        availableCountries: {
            name: string;
            isoCode: string;
            currency: {
                isoCode: string;
            }
            availableLanguages: {
                isoCode: string;
            }[]
        }[]
    }
}