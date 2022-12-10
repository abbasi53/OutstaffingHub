type DimensionName =
  | 'Organization'
  | 'Industry'
  | 'Project Type'
  | 'Technology'
  | 'Commercial'
  | 'Culture';

type Dimension = {
  dimension: DimensionName;
  comment: string;
  percentage: number;
};

export interface MatchedCompany {
  companyId: string;
  totalMatch: number;
  details: string;
  status: string;
  dimensions: Dimension[];
}
