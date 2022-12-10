import { GraphQLObjectType } from 'graphql';
import { BillingData, BillingDataType } from './billingProcess';
import { BudgetData, BudgetDataType } from './budget';
import { PaymentDataType, PaymentTermsData } from './payment';

export type CommercialData = {
  budget: BudgetData;
  paymentTerms: PaymentTermsData;
  billingProcess: BillingData;
};

export const CommercialDataType = new GraphQLObjectType<CommercialData>({
  name: 'CommercialDataType',
  fields: {
    budget: {
      type: BudgetDataType,
      description: 'Budget',
      resolve: entity => entity.budget,
    },
    paymentTerms: {
      type: PaymentDataType,
      description: 'Payment terms',
      resolve: entity => entity.paymentTerms,
    },
    billingProcess: {
      type: BillingDataType,
      description: 'Billing process',
      resolve: entity => entity.billingProcess,
    },
  },
});
