import { NewIntegration } from 'graphql-editor-cli';
import { handler as initStripecustomer } from './Mutation/initStripeCustomer.js';

const integration = NewIntegration({
    Mutation: {
        initStripecustomer: {
          name: 'initStripeCustomer',
          description: 'Stripe customer init',
          handler: initStripecustomer,
        },
      },
});

export default integration;
