import React from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import styles from '../styles/styles';

export const Home = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Divider />
      <Layout style={styles.center}>
        <Text category="h1">Home</Text>
      </Layout>
    </SafeAreaView>
  );
};
export default Home;
