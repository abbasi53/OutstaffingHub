import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import MatchingModel from './MatchingModel';
import { GraphQLContext } from '../../../types';
import { RunMatchingAlgorithm } from './algorithm/RunMatchingAlgorithm';
import { RunSingleMatch } from './algorithm/single/RunSingleMatch';
import UserModel from '../User/UserModel';

const {
  Wrapper: Matching,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  defaultConditions: { isActive: true },
  isAggregate: true,
  model: MatchingModel,
  loaderName: 'MatchingLoader',
});

registerLoader('MatchingLoader', getLoader);

const loadSpecificationMatching = async (
  _context: GraphQLContext,
  id: string,
) => {
  return MatchingModel.findOne({
    isActive: true,
    specification: id,
  });
};

const getCompaniesForMatching = async (
  _context: GraphQLContext,
  specificationId: string,
) => {
  return RunMatchingAlgorithm(specificationId);
};

const getSingleMatchData = async (
  specificationId: string,
  companyId: string,
) => {
  return RunSingleMatch(specificationId, companyId);
};

const getMatchesAdminPreview = async (
  context: GraphQLContext,
  slugs: string[],
) => {
  const isAdmin = context.user?.type === 'ADMIN';

  if (!isAdmin) {
    return {
      error: 'Not Authorized.',
    };
  }

  const companies = await UserModel.find({
    isActive: true,
    slug: { $in: slugs },
  });

  return companies;
};

const getMatchedCompaniesBySpecification = async (specificationId: string) => {
  return MatchingModel.findOne({ specification: specificationId });
};

export {
  getLoader,
  clearCache,
  load,
  loadAll,
  loadSpecificationMatching,
  getCompaniesForMatching,
  getSingleMatchData,
  getMatchesAdminPreview,
  getMatchedCompaniesBySpecification,
};

export default Matching;
