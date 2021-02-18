import React from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import styles from '../styles/styles';

export const Profile = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Divider />
      <Layout style={styles.center}>
        <Text category="h1">Profile</Text>
      </Layout>
    </SafeAreaView>
  );
};
export default Profile;
