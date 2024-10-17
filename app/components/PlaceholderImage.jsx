import {Image} from '@shopify/hydrogen';

export function PlaceholderImage(altText) {
  return (
    <img
      alt={altText}
      src="/assets/images/placeholder-images-image_large.webp"
      className="border-2"
    />
  );
}
