import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   images: [ProductVariantFragment['image']];
 * }}
 */

export function EmptyProductImage({className}) {
  return <div className={className} />;
}

export function ProductGallery({images}) {
  if (!images || images.length === 0) {
    return <EmptyProductImage className="product-gallery" />;
  }
  return (
    <div className="product-gallery grid grid-cols-2 gap-2">
      {images.map((image, idx) => {
        return (
          <div key={idx} className={`${idx === 0 && 'col-span-2'}`}>
            <Image
              alt={image.altText || 'Product Image'}
              aspectRatio="1/1"
              data={image}
              key={image.id}
              sizes="(min-width: 45em) 50vw, 100vw"
            />
          </div>
        );
      })}
    </div>
  );
}

export function ProductImageSlide({images}) {
  if (!images || images.length === 0) {
    return <EmptyProductImage className="product-image-slide" />;
  }
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
