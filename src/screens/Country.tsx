/* eslint-disable react-hooks/exhaustive-deps */
import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Link from '~/components/Link';
import Text from '~/components/Text';
import Title from '~/components/Title';
import RowJustifyBetween from '~/components/RowJustifyBetween';
import {
  GetCountryData,
  GetCountryVars,
  GET_COUNTRY,
} from '~/graphql/getCountry';
import { Country, RootStackScreenProps } from '~/types';
import ScreenContainer from '~/components/ScreenContainer';

export type CountryScreenParams = Pick<Country, 'code'>;

type Props = RootStackScreenProps<'Country'>;

export default function CountryScreen(props: Props) {
  const { route, navigation } = props;

  const { code } = route.params;

  const client = useApolloClient();

  const [data, setData] = useState<GetCountryData['country']>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCountry();
  }, [code]);

  async function getCountry() {
    setLoading(true);

    try {
      const response = await client.query<GetCountryData, GetCountryVars>({
        query: GET_COUNTRY,
        variables: {
          code,
        },
      });

      setData(response.data.country);
    } catch (error) {
      console.log('Get country error:', error);
      Alert.alert('Country not available at this moment.');
    } finally {
      setLoading(false);
    }
  }

  function handleContinentPress() {
    if (!data) {
      return;
    }

    navigation.push('Continent', {
      code: data.continent.code,
    });
  }

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (data) {
    return (
      <StyledScreenContainer>
        <Flag>{data.emoji}</Flag>

        <Title>{data.name}</Title>

        <InfoWrapper>
          <RowJustifyBetween>
            <Text>alpha2Code</Text>

            <Text>{code}</Text>
          </RowJustifyBetween>

          <RowJustifyBetween>
            <Text>callingCodes</Text>

            <Text>+{data.phone}</Text>
          </RowJustifyBetween>

          <RowJustifyBetween>
            <Text>continent</Text>

            <TouchableOpacity onPress={handleContinentPress}>
              <Link>{data.continent.name}</Link>
            </TouchableOpacity>
          </RowJustifyBetween>
        </InfoWrapper>
      </StyledScreenContainer>
    );
  }

  return null;
}

const StyledScreenContainer = styled(ScreenContainer)`
  align-items: center;
`;

const InfoWrapper = styled.View`
  margin-top: 20px;
  width: 100%;
`;

const Flag = styled(Text)`
  font-size: 80px;
`;
