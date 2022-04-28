import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ContinentScreen from '~/screens/Continent';
import CountryScreen from '~/screens/Country';
import HomeScreen from '~/screens/Home';

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['rnhw://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Country: 'country/:code',
      Continent: 'continent/:code',
    },
  },
};

export const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}>
          <Stack.Navigator
            screenOptions={{
              title: '',
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Country" component={CountryScreen} />
            <Stack.Screen name="Continent" component={ContinentScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
