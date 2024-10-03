export const RECENTLY_ADDED_PRODUCTS_QUERY = `#graphql
fragment RecentlyAddedProduct on Product {
  id
  title
  handle
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 1) {
    nodes {
      id
      url
      altText
      width
      height
    }
  }
}
query RecentlyAddedProduct ($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
  products(first: 4, sortKey: CREATED_AT, reverse: true) {
    nodes {
      ...RecentlyAddedProduct
    }
  }
}
`;
