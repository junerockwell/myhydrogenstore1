import {Image} from '@shopify/hydrogen';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';

/**
 * @param {{
 *   images: [ProductVariantFragment['image']];
 * }}
 */

export function EmptyProductImage({className}) {
  return <div className={className} />;
}

export function ProductGallery({images, breakPointClasses}) {
  const className = 'product-gallery';
  if (!images || images.length === 0) {
    return <EmptyProductImage className={className} />;
  }
  return (
    <div className={`${breakPointClasses} ${className} grid-cols-2 gap-2`}>
      {images.map((image, idx) => {
        return (
          <div key={image.id} className={`${idx === 0 && 'col-span-2'}`}>
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

export function ProductImageSlide({images, breakPointClasses}) {
  const className = 'product-image-slide';
  if (!images || images.length === 0) {
    return <EmptyProductImage className={className} />;
  }
  return (
    <div
      className={`${breakPointClasses} ${className} w-full max-w-full max-h-screen min-h-0 min-w-0`}
    >
      <Swiper
        // spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        // navigation={true}
        // modules={[Navigation]}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <Image
                alt={image.altText || 'Product Image'}
                aspectRatio="1/1"
                data={image}
                sizes="(min-width: 45em) 50vw, 100vw"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default function ProductImages({images}) {
  if (!images || images.length === 0) {
    return <EmptyProductImage className="product-images" />;
  }

  return (
    <>
      <ProductGallery images={images} breakPointClasses="hidden md:grid" />
      <ProductImageSlide images={images} breakPointClasses="block md:hidden" />
    </>
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
