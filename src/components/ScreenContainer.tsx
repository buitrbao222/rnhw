import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

type Props = {
  noPadding?: boolean;
  alignItems?: ViewStyle['alignItems'];
};

const ScreenContainer = styled(SafeAreaView)<Props>`
  flex: 1;
  padding: ${props => (props.noPadding ? '0' : '0 20px')};
  align-items: ${props => props.alignItems || 'stretch'};
`;

export default ScreenContainer;
