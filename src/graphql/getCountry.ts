import { gql } from '@apollo/client';
import { Continent, Country, ID } from '~/types';

export type GetCountryData = {
  country: Pick<Country, 'code' | 'name' | 'phone' | 'emoji'> & {
    continent: Pick<Continent, 'name' | 'code'>;
  };
};

export type GetCountryVars = {
  code: ID;
};

export const GET_COUNTRY = gql`
  query getCountry($code: ID!) {
    country(code: $code) {
      code
      name
      phone
      emoji
      continent {
        name
        code
      }
    }
  }
`;
