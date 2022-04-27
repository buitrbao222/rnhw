import React from 'react';
import { Text } from 'react-native';
import { ID } from '~/types';

export type ContinentScreenParams = {
  code: ID;
};

export default function ContinentScreen() {
  return <Text>Continent</Text>;
}
