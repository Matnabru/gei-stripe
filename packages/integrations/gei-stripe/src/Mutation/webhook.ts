import Stripe from 'stripe';
import { FieldResolveInput } from 'stucco-js';
import { newStripe } from '../utils/utils.js';
import { stripeSubscriptionDelete, stripeSubscriptionInsert, stripeSubscriptionUpdate } from '../utils/stripeSubscriptionEvents.js';
import { resolverFor } from '../zeus/index.js';

export const handler = async (input: FieldResolveInput) => 
  resolverFor('Mutation','webhook',async (args) => {
    console.log("HELLO")
  })(input.arguments);


export const handler2 = async (input: FieldResolveInput) => {
  console.log("NEW REQUEST")
  console.log(input.protocol?.body)
  console.log(input.protocol?.headers)
  if (input.protocol?.body && input.protocol?.headers) {
    const stripe = newStripe();
    const STRIPE_SIGNING_KEY = process.env.STRIPE_SIGNING_KEY;
    const sig = input.protocol.headers['Stripe-Signature'];
    if (STRIPE_SIGNING_KEY && sig) {
      try {
        const ev = await stripe.webhooks.constructEventAsync(input.protocol.body, sig[0], STRIPE_SIGNING_KEY);
        const subEvent = ev.data.object as Stripe.Subscription;
        switch (ev.type) {
          case 'customer.subscription.created':
            return stripeSubscriptionInsert(subEvent);
          case 'customer.subscription.updated':
            return stripeSubscriptionUpdate(subEvent);
          case 'customer.subscription.deleted':
            return stripeSubscriptionDelete(subEvent);
          // Add more cases here for other event types...
        }
      } catch (e) {
        throw new Error('cannot authorize request');
      }
    }
  }
};
