import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  Icon,
  BottomNavigationTab,
} from '@ui-kitten/components';
import Home from './src/assets/Home';
import Explore from './src/assets/Explore';
import Share from './src/assets/Share';
import Profile from './src/assets/Profile';
import Log from './src/assets/Log';
const {Navigator, Screen} = createBottomTabNavigator();

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
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name="Explore" component={Explore} />
    <Screen name="Log" component={Log} />
    <Screen name="Share" component={Share} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
