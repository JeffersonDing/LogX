import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  BottomNavigation,
  Icon,
  BottomNavigationTab,
} from '@ui-kitten/components';
import Home from '../src/assets/Home.js';
import Explore from '../src/assets/Explore';
import Share from '../src/assets/Share';
import Profile from '../src/assets/Profile';
import Log from '../src/assets/Log';
import Login from '../src/assets/Login';
import Register from '../src/assets/Register';
import GInit from '../src/assets/GInit';
import {ref} from '../src/helpers/RealTimeDB';

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeIcon = (props) => <Icon {...props} name="home" />;
const ExploreIcon = (props) => <Icon {...props} name="compass" />;
const ShareIcon = (props) => <Icon {...props} name="layout" />;
const LogIcon = (props) => <Icon {...props} name="grid" />;
const ProfileIcon = (props) => <Icon {...props} name="person" />;

const BottomTabBar = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    appearance="noIndicator">
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Explore" icon={ExploreIcon} />
    <BottomNavigationTab title="Log" icon={LogIcon} />
    <BottomNavigationTab title="Share" icon={ShareIcon} />
    <BottomNavigationTab title="Profile" icon={ProfileIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    tabBarOptions={{
      keyboardHidesTabBar: true,
    }}>
    <Screen name="Home" component={Home} />
    <Screen name="Explore" component={Explore} />
    <Screen name="Log" component={Log} />
    <Screen name="Share" component={Share} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);

const AuthStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  const onAuthStateChanged = (user) => {
    if (user) {
      setUser(user);
      ref
        .child('users/')
        .once('value')
        .then((snapshot) => {
          if (snapshot.child(user.uid).exists()) {
            if (initializing) setInitializing(false);
            setAuthStatus(true);
            return;
          } else {
            setInitializing(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAuthStatus(false);
      setInitializing(false);
      setUser(user);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (initializing) {
    return (
      <GInit
        onComplete={() => {
          setAuthStatus(true);
          setInitializing(false);
        }}
      />
    );
  }
  return (
    <NavigationContainer>
      {authStatus ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
