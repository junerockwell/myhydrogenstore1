import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {useLocation} from '@remix-run/react';

export function ProductVariantLinks({products}) {
  if (!products || products.length === 0) return null;

  const sortedProductsDESC = products.sort((a, b) =>
    a.title > b.title ? 1 : -1,
  );

  return (
    <div className="grid grid-cols-4 gap-2">
      {sortedProductsDESC.map((product, idx) => {
        return (
          <SingleProductVariantLink key={product.title} product={product} />
        );
      })}
    </div>
  );
}

export function SingleProductVariantLink({product}) {
  const {featuredImage} = product;
  const location = useLocation();
  console.log('location: ', location);
  const isActive = isActiveVariant(location.pathname, product.handle);
  return (
    <div
      className={`${!product.availableForSale ? 'opacity-30 bg-white' : ''}
      ${isActive ? 'border-1' : ''}`}
    >
      <Link to={`/products/${product.handle}`}>
        <Image
          alt={
            featuredImage.altText || `${product.title} variant image clickable`
          }
          aspectRatio="1/1"
          data={featuredImage}
          sizes="(min-width: 45em) 50vw, 100vw"
        />
      </Link>
    </div>
  );
}

function isActiveVariant(url, handle) {
  if (url.includes(handle)) return true;
  return false;
}
