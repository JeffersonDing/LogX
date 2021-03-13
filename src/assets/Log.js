import React, {useContext, useState} from 'react';
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
import {ref} from '../helpers/RealTimeDB';

const getUsers = (query, count) => {
  ref
    .child('users')
    .orderByChild('info/cs')
    .startAt(query)
    .endAt(query + '\uf8ff')
    .limitToFirst(count)
    .once('value')
    .then((snapshot) => {
      console.log(snapshot.val());
    });
};

export const Log = ({navigation}) => {
  const styles = useStyleSheet(styleSheet);
  const {userData} = useContext(AuthContext);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [resLimit, setResLimit] = useState(5);

  return (
    <TouchableWithoutFeedback
      style={logStyles.container}
      onPress={Keyboard.dismiss}
      accessible={false}>
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
            onBlur={() => setSearch(false)}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <LogList cs={userData.info.cs} search={search} />
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
