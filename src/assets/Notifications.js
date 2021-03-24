import React, {useContext, useState} from 'react';
import {SafeAreaView, Image, View} from 'react-native';

import {
  Button,
  List,
  ListItem,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import NotificationBar from './components/Notifications';

import styles from '../styles/styles';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';

export const Notifications = ({navigation}) => {
  const {user, userData} = useContext(AuthContext);
  const notiStyles = useStyleSheet(notificationsStyleSheet);
  const handleAccept = (lid, loc) => {
    ref
      .child(`logs/pending/${lid}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        ref.child(`logs/verified/${lid}`).set(data);
      })
      .then(() => {
        ref.child(`users/${user.uid}/notifications/${loc}`).remove();
      });
  };
  const renderItemAccessory = (lid, loc) => {
    return (
      <Button
        size="tiny"
        style={notiStyles.button}
        onPress={() => handleAccept(lid, loc)}>
        ACCEPT
      </Button>
    );
  };
  const RenderAvatar = (props) => {
    return <Image style={notiStyles.avatar} source={{uri: props.uri}} />;
  };
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={`${item.title}`}
        description={`${item.description}`}
        accessoryLeft={() => <RenderAvatar uri={item.photoURL} />}
        accessoryRight={() => renderItemAccessory(item.lid, item.loc)}
        onPress={() =>
          navigation.navigate('LogDetails', {valid: false, lid: item.lid})
        }
      />
    );
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <Layout style={notiStyles.container}>
        {userData.notificationData.length ? (
          <List data={userData.notificationData} renderItem={renderItem} />
        ) : (
          <View style={notiStyles.barContainer}>
            <NotificationBar num="no" disabled />
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const notificationsStyleSheet = StyleService.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'color-success-default',
    borderWidth: 0,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  barContainer: {
    height: 80,
  },
});
export default Notifications;
