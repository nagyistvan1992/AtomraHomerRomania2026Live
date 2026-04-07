import { catalogProducts } from './data/catalog';

export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = catalogProducts
  .filter((product) => product.stripe_price_id)
  .map((product) => ({
    id: product.slug,
    priceId: product.stripe_price_id as string,
    name: product.name,
    description: product.description,
    mode: product.stripe_mode || 'payment'
  }));

export const getProductByPriceId = (priceId: string): StripeProduct | undefined =>
  stripeProducts.find((product) => product.priceId === priceId);

export const getProductById = (id: string): StripeProduct | undefined =>
  stripeProducts.find((product) => product.id === id);
