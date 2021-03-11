import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Card,
  Avatar,
} from '@ui-kitten/components';
import styleSheet from '../styles/styles';
import Feed from './components/Feed';
import Notifications from './components/Notifications';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../navigation/AuthProvider';
import database from '@react-native-firebase/database';

const Home = ({navigation}) => {
  const styles = useStyleSheet(styleSheet);
  const homeStyles = useStyleSheet(homeStyleSheet);
  const {user} = useContext(AuthContext);
  const {userData, setUserData} = useContext(AuthContext);

  const [pageData, setPageData] = useState({
    first: '',
    last: '',
    cs: '',
    notifications: 1,
    pfp:
      'https://firebasestorage.googleapis.com/v0/b/logx-472fa.appspot.com/o/public%2Favatar.png?alt=media&token=9348ad0e-dc26-42ad-9851-a37465e8a69f',
  });

  const getNotificationsCount = (notifications) => {
    let count = 0;
    Object.entries(notifications).forEach(([key, value]) => {
      if (key != '_INIT_') {
        count += Object.keys(value).length;
      }
    });
    return count;
  };

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}`)
      .on('value', (snapshot) => {
        setData(snapshot.val());
      });
    const setData = (data) => {
      if (
        JSON.stringify(userData.notifications) !==
        JSON.stringify(data.notifications)
      ) {
        const notificationCount = getNotificationsCount(data.notifications);
        setPageData({
          first: data.info.first,
          last: data.info.last,
          cs: data.info.cs,
          notifications: notificationCount,
          pfp: data.info.photoURL,
        });
        data = {...data, notificationCount: notificationCount};
      } else {
        setPageData({
          ...pageData,
          first: data.info.first,
          last: data.info.last,
          cs: data.info.cs,
          pfp: data.info.photoURL,
        });
      }
      setUserData(data);
    };
    // Stop listening for updates when no longer required
    return () =>
      database().ref(`/users/${user.uid}`).off('value', onValueChange);
  }, [user]);

  const Header = (props) => (
    <View {...props}>
      <Text category="h2" style={styles.textWhite}>
        Good Morning!
      </Text>
    </View>
  );
  const notificationBar = (num) => {
    if (num !== 0) {
      return (
        <Notifications
          num={num}
          onPress={() => navigation.navigate('Notifications')}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.safeView}>
        <Layout style={styles.upper}>
          <Card
            style={homeStyles.introCard}
            header={Header}
            onPress={() => navigation.navigate('Profile')}>
            <View style={styles.row}>
              <Avatar
                style={homeStyles.avatar}
                source={{
                  uri: pageData.pfp,
                }}
              />
              <View style={{...styles.col, ...homeStyles.name}}>
                <Text category="h2" style={styles.textWhite}>
                  {pageData.first}
                </Text>
                <Text category="h4" style={styles.textWhite}>
                  {pageData.last}
                </Text>
              </View>
            </View>
            <View style={styles.center}>
              <Text style={homeStyles.callSign}>{pageData.cs}</Text>
            </View>
          </Card>
        </Layout>
        {notificationBar(pageData.notifications)}
        <Feed
          pfp={require('../img/test.png')}
          name="Jonathan Esho"
          callSign="DV 3SC"
          text="Hello World!"
          img={require('../img/placeholder.png')}
        />
        <Feed
          pfp={require('../img/test.png')}
          name="Gavin Benson"
          callSign="K9VBR"
          text="Hi, this is my first message on this app! Hello all!"
          img={require('../img/placeholder.png')}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const homeStyleSheet = StyleService.create({
  name: {
    marginLeft: 20,
  },
  introCard: {
    margin: 2,
    marginTop: 40,
    marginBottom: 20,
    width: '95%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'color-primary-500',
  },
  avatar: {
    height: 110,
    width: 110,
  },
  callSign: {
    fontSize: 60,
    color: 'white',
  },
});

export default Home;
