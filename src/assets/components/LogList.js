import React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Card,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';
import Item from './LogListItem';

const LogList = (props) => {
  const styles = useStyleSheet(styleSheet);
  const listStyles = useStyleSheet(listStyleSheet);

  const Header = () => (
    <View>
      <Text category="h3">{`${props.cs} LoogBook`}</Text>
    </View>
  );

  return (
    <Layout style={styles.upper}>
      <Card style={listStyles.card} header={Header}>
        <ScrollView>
          <Item
            id="34a44374-7250-4fe0-a716-72f5ef025802"
            cs="VA3JFO"
            time={12341243}
            status={false}
          />
        </ScrollView>
      </Card>
    </Layout>
  );
};

const listStyleSheet = StyleService.create({
  card: {
    alignItems: 'center',
    marginBottom: 80,
    width: '90%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  icon: {
    height: 40,
    width: 40,
  },
  searchbar: {
    width: '90%',
  },
});

export default LogList;
