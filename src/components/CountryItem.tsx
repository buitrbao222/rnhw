import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Text from '~/components/Text';
import { Country, RootStackNavigation } from '~/types';

type Props = Pick<Country, 'code' | 'name' | 'capital' | 'emoji'> & {
  style?: StyleProp<ViewStyle>;
};

export default function CountryListItem(props: Props) {
  const { code, name, capital, emoji, style } = props;

  const navigation = useNavigation<RootStackNavigation<'Home'>>();

  function handlePress() {
    navigation.push('Country', {
      code,
    });
  }

  return (
    <LinkCard onPress={handlePress} style={style}>
      <Flag>{emoji}</Flag>

      <InfoWrapper>
        <CountryName numberOfLines={1}>{name}</CountryName>

        <CapitalName numberOfLines={1}>{capital}</CapitalName>
      </InfoWrapper>
    </LinkCard>
  );
}

const LinkCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.8;
  elevation: 5;
  background-color: #fff;
`;

const InfoWrapper = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const Flag = styled(Text)`
  font-size: 40px;
  line-height: 46px;
`;

const CountryName = styled(Text)`
  font-weight: bold;
  font-size: 18px;
`;

const CapitalName = styled(Text)`
  opacity: 0.5;
`;
