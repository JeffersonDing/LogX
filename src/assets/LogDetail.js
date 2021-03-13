import {Text} from '@ui-kitten/components';
import {PropsService} from '@ui-kitten/components/devsupport';
import React from 'react';
import {SafeAreaView, Image} from 'react-native';

const LogDetail = ({route, navigation}) => {
  return (
    <SafeAreaView>
      <Text>{route.params.test}</Text>
    </SafeAreaView>
  );
};
export default LogDetail;
