import { iGraphQL } from 'i-graphql';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';

export const orm = async () => {
  return iGraphQL<
    {
      SubscriptionCollection: Stripe.Subscription
    },
    {
      _id: () => string;
      createdAt: () => string;
    }
  >({
    _id: () => new ObjectId().toHexString(),
    createdAt: () => new Date().toISOString(),
  });
};

export const MongoOrb = await orm();
