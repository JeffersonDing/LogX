import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Card,
  Icon,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const ArrowIcon = (props) => (
  <Icon {...props} fill="#8F9BB3" name="chevron-right" />
);
const BellIcon = (props) => <Icon {...props} fill="#118AB2" name="bell" />;

const LogListItem = (props) => {
  const styles = useStyleSheet(styleSheet);
  const itemStyles = useStyleSheet(itemStyleSheet);

  return (
    <Card style={{...itemStyles.card, ...props.style}}>
      <View style={styles.row}>
        <Text>{props.cs}</Text>
        <Text>{props.time}</Text>
      </View>
    </Card>
  );
};

const itemStyleSheet = StyleService.create({
  card: {
    alignItems: 'center',
    marginBottom: 80,
    width: '90%',
    borderRadius: 25,
  },
});

export default LogListItem;
