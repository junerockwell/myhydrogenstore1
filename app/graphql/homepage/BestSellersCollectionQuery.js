export const BESTSELLERS_COLLECTION_QUERY = `#graphql
  fragment BestSellersCollection on Collection {
    id
    title
    description
    products(first: 10, reverse: true) {
      nodes {
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
    }
  }
  query BestSellersCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: "best-sellers") {
      ...BestSellersCollection
    }
  }
`;
