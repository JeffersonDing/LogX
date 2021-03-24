import React, {useContext, useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useStyleSheet, Layout, Button, Icon} from '@ui-kitten/components';
import Notifications from './components/Notifications';
import SearchBar from './components/SearchBar';
import LogList from './components/LogList';
import {AuthContext} from '../../navigation/AuthProvider';
import styleSheet from '../styles/styles';
import {ref} from '../helpers/RealTimeDB';

export const Log = ({navigation}) => {
  const styles = useStyleSheet(styleSheet);
  const {user, userData} = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [data, setData] = useState({});
  const getUsers = () => {
    if (query) {
      ref
        .child('users')
        .orderByChild('info/cs')
        .startAt(query)
        .endAt(query + '\uf8ff')
        .once('value')
        .then((snapshot) => {
          setData(snapshot.val());
        });
    } else {
      ref
        .child('users')
        .orderByChild('info/cs')
        .once('value')
        .then((snapshot) => {
          setData(snapshot.val());
        });
    }
  };

  const PlusIcon = () => (
    <Icon style={logStyles.icon} fill="#FFFFFF" name="search" />
  );
  useEffect(() => {
    getUsers();
  }, [query]);

  const Logs = () => {
    return (
      <LogList
        data={userData.contacts}
        uid={user.uid}
        title={`${userData.info.cs} LogBook`}
        search={search}
        navigation={navigation}
      />
    );
  };

  const UserSearch = () => {
    return (
      <LogList
        cs={userData.info.cs}
        data={data}
        title="User Search"
        uid={user.uid}
        search={search}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={logStyles.notification}>
        <Notifications
          num={userData.notificationCount}
          onPress={() => navigation.navigate('Notifications')}
          iconSize={{height: 25, width: 25}}
        />
      </View>
      <View style={logStyles.searchbar}>
        <SearchBar
          value={query}
          onChangeText={(text) => {
            setQuery(text);
          }}
        />
      </View>
      {search ? <UserSearch /> : <Logs />}
      <Button
        style={logStyles.floatingButton}
        accessoryRight={PlusIcon}
        onPress={() => setSearch((prev) => !prev)}
      />
    </SafeAreaView>
  );
};

const logStyles = StyleSheet.create({
  notification: {
    height: 70,
  },
  searchbar: {
    height: 50,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 35,
    width: 35,
  },
});
export default Log;
