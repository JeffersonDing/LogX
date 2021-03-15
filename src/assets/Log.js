import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';
import Notifications from './components/Notifications';
import SearchBar from './components/SearchBar';
import LogList from './components/LogList';
import {AuthContext} from '../../navigation/AuthProvider';
import styleSheet from '../styles/styles';
import {getData, ref} from '../helpers/RealTimeDB';

export const Log = ({navigation}) => {
  const styles = useStyleSheet(styleSheet);
  const {userData} = useContext(AuthContext);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [reqLimit, setReqLimit] = useState(5);
  const [data, setData] = useState({});

  const getUsers = () => {
    if (query) {
      ref
        .child('users')
        .orderByChild('info/cs')
        .startAt(query)
        .endAt(query + '\uf8ff')
        .limitToFirst(reqLimit)
        .once('value')
        .then((snapshot) => {
          setData(snapshot.val());
        });
    } else {
      ref
        .child('users')
        .orderByChild('info/cs')
        .limitToFirst(reqLimit)
        .once('value')
        .then((snapshot) => {
          setData(snapshot.val());
        });
    }
  };

  useEffect(() => {
    getUsers();
  }, [query]);
  const getLogs = () => {};

  return (
    <TouchableWithoutFeedback
      style={logStyles.container}
      onPress={Keyboard.dismiss}
      accessible={false}
      disabled={!search}>
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
            onFocus={() => setSearch(true)}
            onBlur={() => {
              setSearch(false);
              setReqLimit(5);
            }}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
            }}
          />
        </View>
        <LogList
          cs={userData.info.cs}
          search={search}
          data={data}
          onBottom={setReqLimit}
          limit={reqLimit}
          navigation={navigation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const logStyles = StyleSheet.create({
  notification: {
    height: 70,
  },
  searchbar: {
    height: 50,
  },
});
export default Log;
