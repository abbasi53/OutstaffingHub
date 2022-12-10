import { GraphQLObjectType } from 'graphql';
import { ClientSizeData, ClientSizeType } from './clientSize';
import { EmployeesData, EmployeesType } from './employees';
import { FoundedYearData, FoundedYearType } from './foundedYear';
import { LocationData, LocationType } from './location';
import { TechnicalTeamData, TechnicalTeamType } from './technicalTeam';

export type OrganizationData = {
  foundedYear: FoundedYearData;
  clientSize: ClientSizeData;
  location: LocationData;
  employees: EmployeesData;
  technicalTeam: TechnicalTeamData;
};

export const OrganizationDataType = new GraphQLObjectType<OrganizationData>({
  name: 'OrganizationData',
  fields: {
    foundedYear: {
      type: FoundedYearType,
      description: 'Founded year',
      resolve: entity => entity.foundedYear,
    },
    clientSize: {
      type: ClientSizeType,
      description: 'Client size',
      resolve: entity => entity.clientSize,
    },
    location: {
      type: LocationType,
      description: 'Location',
      resolve: entity => entity.location,
    },
    employees: {
      type: EmployeesType,
      description: 'Employees',
      resolve: entity => entity.employees,
    },
    technicalTeam: {
      type: TechnicalTeamType,
      description: 'Technical team',
      resolve: entity => entity.technicalTeam,
    },
  },
});
