import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AppNavigator from './navigation/navigation.component';
import {default as theme} from './src/styles/colors.json';
import {AuthProvider} from './navigation/AuthProvider';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ApplicationProvider>
  </>
);
