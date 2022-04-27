import { gql } from '@apollo/client';
import { Continent, Country, ID } from '~/types';

export type GetContinentData = Array<
  Pick<Continent, 'code' | 'name'> & {
    countries: Array<Pick<Country, 'name' | 'code'>>;
  }
>;

export type GetContinentVars = {
  code: ID;
};

export const GET_CONTINENT = gql`
  query getContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        name
        code
      }
    }
  }
`;
