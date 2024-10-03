import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {BESTSELLERS_COLLECTION_QUERY} from '../graphql/homepage/BestSellersCollectionQuery';
import {RECENTLY_ADDED_PRODUCTS_QUERY} from '../graphql/homepage/RecentlyAddedProductsQuery';
import {RECOMMENDED_PRODUCTS_QUERY2} from '../graphql/homepage/RecommendedProductsQuery';
import {
  NEWEST_COLLECTION_QUERY,
  FEATURED_COLLECTION_QUERY,
} from '../graphql/homepage/FeaturedCollectionQuery';
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'MyHydrogenStore1 | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);
  console.log('deferredData: ', deferredData);
  const alsoData = loadAdditionalDeferredData(args);
  const bestSellersDefferedData = loadBestSellersDefferedData(args);
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({
    ...deferredData,
    ...alsoData,
    ...bestSellersDefferedData,
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const criticalData = await Promise.all([
    context.storefront.query(NEWEST_COLLECTION_QUERY),
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);
  // console.log('collections 1: ', criticalData);
  return {
    newestCollection: criticalData[0].collections.nodes[0],
    featuredCollection: criticalData[1].collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY2)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

function loadAdditionalDeferredData({context}) {
  const recentlyAddedProducts = context.storefront
    .query(RECENTLY_ADDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recentlyAddedProducts,
  };
}

function loadBestSellersDefferedData({context}) {
  const bestSellersCollection = context.storefront
    .query(BESTSELLERS_COLLECTION_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    bestSellersCollection,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  console.log('xOx: ', data);
  return (
    <div className="home">
      Hello
      <FeaturedCollection collection={data.featuredCollection} />
      <BestSellersCollection
        title="Best Sellers"
        products={data.bestSellersCollection}
      />
      <RecommendedProducts
        title="Recently Added"
        products={data.recentlyAddedProducts}
      />
      <RecommendedProducts
        title="Recommended Prods"
        products={data.recommendedProducts}
      />
    </div>
  );
}

function BestSellersCollection({title, products}) {
  return (
    <div className="recommended-products">
      <h2>{title}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.collection.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({title, products}) {
  return (
    <div className="recommended-products">
      <h2>{title}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
