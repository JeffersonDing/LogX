import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, Text, Button} from '@ui-kitten/components';
import styles from '../styles/styles';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';

export const Explore = () => {
  const {user} = useContext(AuthContext);
  const postLog = () => {
    const location = ref
      .child('users/V6F7ZDxDwRaaXW6HAHSYyqemqFM2/notifications')
      .push();
    location.set({
      cs: 'TEST CS',
      uid: 'TEST UID',
      logId: 'LOGG',
    });
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <Divider />
      <Layout style={styles.center}>
        <Text category="h1">Explore</Text>
        <Button onPress={postLog}>Post</Button>
        <Button
          onPress={() => {
            ref.child(`users/${user.uid}/info`).update({
              photoURL: 'https://www.w3schools.com/howto/img_avatar.png',
            });
          }}>
          Change Avatar
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
export default Explore;
