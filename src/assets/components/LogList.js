import React, {useState} from 'react';
import {FlatList, View, ScrollView} from 'react-native';
import {StyleService, useStyleSheet, Layout, Text} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

import Item from './LogListItem';

const LogList = (props) => {
  const styles = useStyleSheet(styleSheet);
  const listStyles = useStyleSheet(listStyleSheet);
  let data;
  try {
    data = Object.entries(props.data);
  } catch {
    data = [
      [
        'No Results',
        {
          info: {
            cs: 'No Results',
            first: null,
            last: null,
            photoURL: null,
            address: {country: null},
          },
        },
      ],
    ];
  }

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

  const renderItem = ({item, index}) => {
    const data = item[1];
    const uid = item[0];
    try {
      return (
        <Item
          cs={data.info.cs}
          uid={uid}
          navigation={props.navigation}
          href={data.info.photoURL}
          name={`${data.info.first} ${data.info.last.charAt(0)}.`}
          country={data.info.address.country}
          style={listStyles.item}
        />
      );
    } catch {
      return null;
    }
  };

  return (
    <Layout style={{...listStyles.container, ...styles.upper}}>
      <View style={listStyles.card}>
        <Header />
        <FlatList
          data={data}
          style={listStyles.list}
          contentContainerStyle={listStyles.listContainer}
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
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    width: '90%',
  },
  item: {
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    height: 55,
    borderRadius: 25,
  },
});

export default LogList;
