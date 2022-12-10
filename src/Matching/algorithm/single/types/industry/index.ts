import { GraphQLObjectType } from 'graphql';
import { CertificationsData, CertificationsType } from './certifications';
import {
  FocusedIndustryData,
  FocusedIndustryDataType,
} from './focusedIndustry';

export type IndustryData = {
  certifications: CertificationsData;
  focusedIndustry: FocusedIndustryData;
};

export const IndustryDataType = new GraphQLObjectType<IndustryData>({
  name: 'IndustryDataType',
  fields: {
    certifications: {
      type: CertificationsType,
      description: 'Founded year',
      resolve: entity => entity.certifications,
    },
    focusedIndustry: {
      type: FocusedIndustryDataType,
      description: 'Focused industry',
      resolve: entity => entity.focusedIndustry,
    },
  },
});
