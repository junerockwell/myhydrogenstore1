import {redirect} from '@shopify/remix-oxygen';

export async function loader({context}) {
  console.log('account._index.jsx: ', context.customerAccount);
  return redirect('/account/orders');
}

/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
