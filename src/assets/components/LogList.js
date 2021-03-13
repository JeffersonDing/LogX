import React, {useState} from 'react';
import {FlatList, View, ScrollView} from 'react-native';
import {StyleService, useStyleSheet, Layout, Text} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

import Item from './LogListItem';

const LogList = (props) => {
  const styles = useStyleSheet(styleSheet);
  const listStyles = useStyleSheet(listStyleSheet);

  const DATA = new Array(50).fill({
    title: 'Title for Item',
    description: 'Description for Item',
  });
  const Header = () => {
    if (!props.search) {
      return (
        <View style={listStyles.header}>
          <Text category="h3">{`${props.cs} LoogBook`}</Text>
        </View>
      );
    } else {
      return (
        <View style={listStyles.header}>
          <Text category="h3">{`User List`}</Text>
        </View>
      );
    }
  };

  const renderItem = ({item, index}) => <Text>{`${item.title} ${index}`}</Text>;

  return (
    <Layout style={{...listStyles.container, ...styles.upper}}>
      <View style={listStyles.card}>
        <Header />
        <FlatList
          data={DATA}
          style={listStyles.list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/*<ScrollView>
          <Item
            id="34a44374-7250-4fe0-a716-72f5ef025802"
            cs="VA3JFO"
            time={12341243}
            status={false}
          />
        </ScrollView>*/}
      </View>
    </Layout>
  );
};

const listStyleSheet = StyleService.create({
  card: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: 'color-primary-transparent-200',
    borderRadius: 10,
    width: '90%',
    height: '90%',
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
  header: {
    marginTop: 5,
    marginBottom: 5,
  },
  list: {
    width: '90%',
  },
});

export default LogList;
