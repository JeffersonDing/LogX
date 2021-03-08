import React from 'react';
import {SafeAreaView, View} from 'react-native';
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

const Home = () => {
  const styles = useStyleSheet(styleSheet);
  const homeStyles = useStyleSheet(homeStyleSheet);
  const Header = (props) => (
    <View {...props}>
      <Text category="h2" style={styles.textWhite}>
        Good Morning!
      </Text>
    </View>
  );
  return (
    <ScrollView>
      <SafeAreaView style={styles.safeView}>
        <Layout style={styles.upper}>
          <Card style={homeStyles.introCard} header={Header}>
            <View style={styles.row}>
              <Avatar
                style={homeStyles.avatar}
                source={require('../img/test.png')}
              />
              <View style={{...styles.col, ...homeStyles.name}}>
                <Text category="h4" style={styles.textWhite}>
                  Paul
                </Text>
                <Text category="h6" style={styles.textWhite}>
                  McGregor
                </Text>
                <View style={styles.row}>
                  <Text category="h6" style={styles.textWhite}>
                    A
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.center}>
              <Text style={homeStyles.callSign}>VA3 JFO</Text>
            </View>
          </Card>
        </Layout>
        <Notifications num="15" />
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
    marginLeft: 15,
  },
  introCard: {
    margin: 2,
    marginTop: 40,
    marginBottom: 20,
    width: '85%',
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
    margin: 8,
    height: 100,
    width: 100,
  },
  callSign: {
    fontSize: 60,
    color: 'white',
  },
});

export default Home;
