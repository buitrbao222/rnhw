import { gql } from '@apollo/client';
import { Country } from '~/types';

export type GetCountriesData = {
  countries: Array<Pick<Country, 'code' | 'name' | 'capital' | 'emoji'>>;
};

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      emoji
    }
  }
`;
