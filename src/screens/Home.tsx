import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import styled from 'styled-components/native';
import CountryListItem from '~/components/CountryItem';
import ScreenContainer from '~/components/ScreenContainer';
import Title from '~/components/Title';
import { GetCountriesData, GET_COUNTRIES } from '~/graphql/getCountries';

export default function HomeScreen() {
  const client = useApolloClient();

  const [data, setData] = useState<GetCountriesData>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getCountries() {
    setLoading(true);

    try {
      const response = await client.query<GetCountriesData>({
        query: GET_COUNTRIES,
      });

      setData(response.data);
    } catch (error) {
      console.log('Get countries error:', error);
      Alert.alert('Countries not available at this moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer noPadding>
      <Header />

      <Body>
        <ListTitle>List of countries</ListTitle>

        {loading && <ActivityIndicator size="large" />}

        {data && (
          <ListWrapper>
            <FlatList
              overScrollMode="never"
              data={data.countries}
              renderItem={({ item }) => <ListItem {...item} />}
            />
          </ListWrapper>
        )}
      </Body>
    </ScreenContainer>
  );
}

const Header = styled.View`
  width: 100%;
  height: 256px;
  background-color: #ffc0cb;
  border-bottom-left-radius: 50px;
`;

const Body = styled.View`
  flex: 1;
  padding: 0 20px;
  margin-top: 24px;
`;

const ListTitle = styled(Title)`
  margin-bottom: 16px;
`;

const ListWrapper = styled.View`
  margin: 0 -20px;
`;

const ListItem = styled(CountryListItem)`
  margin: 8px 20px;
`;
