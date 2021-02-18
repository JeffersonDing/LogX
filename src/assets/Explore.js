import React from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import styles from '../styles/styles';

export const Explore = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <Divider />
      <Layout style={styles.center}>
        <Text category="h1">Explore</Text>
      </Layout>
    </SafeAreaView>
  );
};
export default Explore;
