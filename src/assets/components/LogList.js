import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
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
    data = null;
  }

  const Header = () => {
    return (
      <View style={listStyles.header}>
        <Text category="h3">{props.title}</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    const data = item[1];
    const uid = item[0];
    if (uid === props.uid) {
      return null;
    }

    try {
      return (
        <Item
          cs={data.info.cs}
          uid={uid}
          navigation={props.navigation}
          search={props.search}
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
  const renderContactItem = ({item, index}) => {
    const data = item[1];
    const logid = item[0];
    let cs, photoURL;
    if (props.uid === data.from) {
      cs = data.with_cs;
      photoURL = data.with_url;
    } else {
      cs = data.from_cs;
      photoURL = data.from_url;
    }
    if (logid === '_INIT_') {
      return null;
    }
    try {
      return (
        <Item
          cs={cs}
          logid={logid}
          search={props.search}
          navigation={props.navigation}
          href={photoURL}
          name={`${data.band} ${data.freq}`}
          country={`${data.pow} ${data.mode}`}
          style={listStyles.item}
        />
      );
    } catch {
      return null;
    }
  };
  const RenderList = () => {
    if (props.search) {
      return (
        <FlatList
          data={data}
          style={listStyles.list}
          contentContainerStyle={listStyles.listContainer}
          renderItem={renderItem}
          keyExtractor={(item, index) => item[0]}
        />
      );
    } else {
      return (
        <FlatList
          data={data}
          style={listStyles.list}
          contentContainerStyle={listStyles.listContainer}
          renderItem={renderContactItem}
          keyExtractor={(item, index) => item[0]}
        />
      );
    }
  };

  return (
    <Layout style={{...listStyles.container, ...styles.upper}}>
      <View style={listStyles.card}>
        <Header />
        <RenderList />
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
