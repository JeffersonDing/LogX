import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Divider, Layout, Text, Avatar} from '@ui-kitten/components';
import styles from '../styles/styles';
import {AuthContext} from '../../navigation/AuthProvider';

export const Profile = () => {
  const {user, logout, userData} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.safeView}>
      <Divider />
      <Layout style={styles.center}>
        <Text category="h1">{`${userData.info.first} ${userData.info.last}`}</Text>
        <Button style={styles.loginButton} onPress={() => logout()}>
          Logout
        </Button>
        <Button
          style={styles.loginButton}
          onPress={() => {
            user.updateProfile({
              photoURL:
                'https://firebasestorage.googleapis.com/v0/b/logx-472fa.appspot.com/o/public%2Favatar.png?alt=media&token=9348ad0e-dc26-42ad-9851-a37465e8a69f',
            });
          }}>
          Set Profile
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
export default Profile;
