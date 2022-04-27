import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ContinentScreenParams } from '~/screens/Continent';
import { CountryScreenParams } from '~/screens/Country';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  Country: CountryScreenParams;
  Continent: ContinentScreenParams;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

export type RootStackNavigation<Screen extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, Screen>;

export type ID = string;

export type Continent = {
  code: ID;
  name: string;
  countries: Array<Country>;
};

export type Language = {
  code: ID;
  name?: string;
  native?: string;
  rtl?: boolean;
};

export type State = {
  code?: ID;
  name: string;
  country: Country;
};

export type Country = {
  code: ID;
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  capital?: string;
  currency?: string;
  languages: Array<Language>;
  emoji: string;
  emojiU: string;
  states: Array<State>;
};
