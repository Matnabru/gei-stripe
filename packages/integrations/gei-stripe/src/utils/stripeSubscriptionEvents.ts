import Stripe from "stripe";
import { MongoOrb } from "../db/orm.js";

export const stripeSubscriptionInsert = async (subEvent: Stripe.Subscription) => {
    return await MongoOrb('SubscriptionCollection').collection.insertOne({
      ...subEvent
    });
  };
  
  export const stripeSubscriptionUpdate = async (subEvent: Stripe.Subscription) => {
    return await MongoOrb('SubscriptionCollection').collection.updateOne(
      { id: subEvent.id },
      { $set: {
            subEvent
        },
      }
    );
  };
  
  export const stripeSubscriptionDelete = async (subEvent: Stripe.Subscription) => {
    return await MongoOrb('SubscriptionCollection').collection.deleteOne({ scubscriptionId: subEvent.id });
  };