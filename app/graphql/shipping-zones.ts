export const GETALLSHIPPINGZONES = `
query {
  localization {
    availableCountries {
      name
      isoCode
      currency {
        isoCode
      }
      availableLanguages {
        isoCode
      }
    }
  }
}`