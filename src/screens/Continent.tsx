/* eslint-disable react-hooks/exhaustive-deps */
import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Link from '~/components/Link';
import RowJustifyBetween from '~/components/RowJustifyBetween';
import ScreenContainer from '~/components/ScreenContainer';
import Text from '~/components/Text';
import Title from '~/components/Title';
import {
  GetContinentData,
  GetContinentVars,
  GET_CONTINENT,
} from '~/graphql/getContinent';
import { ID, RootStackScreenProps } from '~/types';

export type ContinentScreenParams = {
  code: ID;
};

type Props = RootStackScreenProps<'Continent'>;

export default function ContinentScreen(props: Props) {
  const { route, navigation } = props;

  const { code } = route.params;

  const client = useApolloClient();

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<GetContinentData['continent']>();

  useEffect(() => {
    getContinent();
  }, []);

  async function getContinent() {
    setLoading(true);

    try {
      const response = await client.query<GetContinentData, GetContinentVars>({
        query: GET_CONTINENT,
        variables: {
          code,
        },
      });

      setData(response.data.continent);
    } catch (error) {
      Alert.alert('Continent not available at this moment.');
    } finally {
      setLoading(false);
    }
  }

  function handleCountryPress(countryCode: ID) {
    navigation.push('Country', {
      code: countryCode,
    });
  }

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );
  }

  if (data) {
    return (
      <ScreenContainer>
        <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
          <Body>
            <StyledTitle>{data.name}</StyledTitle>

            <InfoWrapper>
              <RowJustifyBetween>
                <Text>code</Text>

                <Text>{data.code}</Text>
              </RowJustifyBetween>

              <RowJustifyBetween>
                <Text>countries</Text>

                <View>
                  {data.countries.map(country => (
                    <TouchableOpacity
                      key={country.code}
                      onPress={() => handleCountryPress(country.code)}>
                      <StyledLink>{country.name}</StyledLink>
                    </TouchableOpacity>
                  ))}
                </View>
              </RowJustifyBetween>
            </InfoWrapper>
          </Body>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return null;
}

const Body = styled.View`
  flex: 1;
  padding-vertical: 30px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-align: right;
`;

const InfoWrapper = styled.View`
  margin-top: 20px;
  width: 100%;
`;
