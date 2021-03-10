import React, {useContext} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';
import Notifications from './components/Notifications';
import SearchBar from './components/SearchBar';
import LogList from './components/LogList';
import {AuthContext} from '../../navigation/AuthProvider';
import styleSheet from '../styles/styles';

export const Log = () => {
  const styles = useStyleSheet(styleSheet);
  const {userData} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={logStyles.notification}>
        <Notifications num={Object.keys(userData.notifications).length - 1} />
      </View>
      <View style={logStyles.searchbar}>
        <SearchBar />
      </View>
      <LogList cs={userData.info.cs} />
    </SafeAreaView>
  );
};

const logStyles = StyleSheet.create({
  notification: {
    height: 70,
  },
  searchbar: {
    height: 60,
  },
});
export default Log;
