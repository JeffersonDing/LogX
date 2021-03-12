import React, {useContext, useState} from 'react';
import {SafeAreaView, Image} from 'react-native';

import {
  Button,
  List,
  ListItem,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

import styles from '../styles/styles';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';

const postLog = () => {
  const location = ref
    .child(`users/VifxsCwqM4YiNE9LUPTr1Y6MfVw1/notifications/${user.uid}`)
    .push();
  location.set({
    cs: 'TEST CS',
    uid: 'TEST UID',
    logId: 'LOGG',
  });
};

export const Notifications = () => {
  const {user, userData} = useContext(AuthContext);
  const notiStyles = useStyleSheet(notificationsStyleSheet);
  const renderItemAccessory = (props) => (
    <Button size="tiny" style={notiStyles.button}>
      ACCEPT
    </Button>
  );
  const RenderAvatar = (props) => {
    return <Image style={notiStyles.avatar} source={{uri: props.uri}} />;
  };

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={`${item.title}`}
        description={`${item.description}`}
        uri={{uri: 'test'}}
        accessoryLeft={() => <RenderAvatar uri={item.photoURL} />}
        accessoryRight={renderItemAccessory}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <Layout>
        <List data={userData.notificationData} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  );
};

const notificationsStyleSheet = StyleService.create({
  container: {
    maxHeight: 192,
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
});
export default Notifications;
