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
import {getData} from '../src/helpers/RealTimeDB';
import Home from '../src/assets/Home.js';
import Explore from '../src/assets/Explore';
import Share from '../src/assets/Share';
import Profile from '../src/assets/Profile';
import Log from '../src/assets/Log';
import Login from '../src/assets/Login';
import Register from '../src/assets/Register';
import Loading from '../src/assets/Loading';

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
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
