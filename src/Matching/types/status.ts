import { MatchedCompanyStatusEnum, MatchingStatusEnum } from '../enum/status';

export type MatchingStatus = typeof MatchingStatusEnum[number];

export type CompanyMatchedStatus = typeof MatchedCompanyStatusEnum[number];
