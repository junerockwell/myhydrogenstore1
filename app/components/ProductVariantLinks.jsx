import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {useLocation} from '@remix-run/react';
import {OutOfStockStrikethrough} from './OutOfStockStrikethrough';

export function ProductVariantLinks({products, colorDisplay}) {
  if (!products || products.length === 0) return null;

  const sortedProductsDESC = products.sort((a, b) =>
    a.title > b.title ? 1 : -1,
  );

  return (
    <div className="flex flex-col">
      <p className="!mb-2">
        <strong>Color: </strong>
        {colorDisplay?.value}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {products.map((product, idx) => {
          return (
            <SingleProductVariantLink key={product.title} product={product} />
          );
        })}
      </div>
    </div>
  );
}

export function SingleProductVariantLink({product}) {
  const {featuredImage} = product;
  const location = useLocation();

  const isActive = isActiveVariant(location.pathname, product.handle);
  return (
    <div
      className={`${!product.availableForSale ? 'opacity-30 bg-white' : ''}
      ${isActive ? 'border-3' : ''}`}
    >
      <Link
        to={`/products/${product.handle}`}
        className="relative overflow-hidden"
      >
        <Image
          alt={
            featuredImage.altText || `${product.title} variant image clickable`
          }
          aspectRatio="1/1"
          data={featuredImage}
          sizes="(min-width: 45em) 50vw, 100vw"
        />
        {!product.availableForSale && (
          <OutOfStockStrikethrough
            strokeWidth={6}
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 1,
              // width: '100%',
              // height: '100%',
              // cursor: 'pointer',
            }}
          />
        )}
      </Link>
    </div>
  );
}

function isActiveVariant(url, handle) {
  if (url.includes(handle)) return true;
  return false;
}
