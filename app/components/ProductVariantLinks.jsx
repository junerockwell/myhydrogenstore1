import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export function ProductVariantLinks({products}) {
  if (!products || products.length === 0) return null;
  return (
    <div className="grid grid-cols-4 gap-2">
      {products.map((product, idx) => {
        return (
          <SingleProductVariantLink key={product.title} product={product} />
        );
      })}
    </div>
  );
}

export function SingleProductVariantLink({product}) {
  const {featuredImage} = product;
  return (
    <div
      className={!product.availableForSale ? 'opacity-60' : 'border-2 rounded'}
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
