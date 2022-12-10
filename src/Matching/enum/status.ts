import { GraphQLEnumType } from 'graphql';
import { tuple } from '../../../../utils/tuple';

export const MatchingStatusEnum = tuple(
  'MATCHED_WITH_COMPANIES',
  'FINALLY_MATCHED',
);

export const MatchedCompanyStatusEnum = tuple(
  'CONFIRMED',
  'REJECTED',
  'PENDING',
);

const MatchedCompanyStatus = {
  CONFIRMED: {
    value: 'CONFIRMED',
    description: 'when company confirm to be matched with specification',
  },
  REJECTED: {
    value: 'REJECTED',
    description: 'when company reject to be matched with specification',
  },
  PENDING: {
    value: 'PENDING',
    description:
      'when company not yet respond if wanted to be matched with specification',
  },
};

export const MatchedCompanyMatchStatus = new GraphQLEnumType({
  name: 'MatchedCompanyMatchStatus',
  values: MatchedCompanyStatus,
});
