import {Link} from '@remix-run/react';
import {VariantSelector} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {ProductVariantLinks} from './ProductVariantLinks';
import {OutOfStockStrikethrough} from '~/components/OutOfStockStrikethrough';

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
export function ProductForm({
  product,
  selectedVariant,
  variants,
  variantProducts,
  colorDisplay,
}) {
  const {open} = useAside();

  return (
    <div className="product-form">
      <ProductVariantLinks
        products={variantProducts}
        colorDisplay={colorDisplay}
      />
      <br />
      <VariantSelector
        handle={product.handle}
        options={product.options.filter((option) => option.values.length > 1)}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />

      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          // open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

/**
 * @param {{option: VariantOption}}
 */
function ProductOptions({option}) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="grid grid-cols-10 gap-2">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              key={option.name + value}
              className="relative overflow-hidden flex flex-col justify-center text-center border-1"
              style={{
                opacity: isAvailable ? 1 : 0.3,
                aspectRatio: '1/1',
                border: isActive && '1px solid black',
                background: isActive && '#000',
                color: isActive ? '#fff' : '#000',
              }}
            >
              <p>{value}</p>
              {!isAvailable && (
                <OutOfStockStrikethrough
                  strokeWidth={10}
                  style={{position: 'absolute', top: 0, zIndex: 1}}
                />
              )}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
