import React from 'react';
import {SafeAreaView, ScrollView, Image, View} from 'react-native';
import {
  Card,
  Layout,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import styleSheet from '../styles/styles';
import Feed from './components/Feed';

export const Share = () => {
  const styles = useStyleSheet(styleSheet);
  const shareStyles = useStyleSheet(shareStyleSheet);

  return (
    <SafeAreaView style={styles.safeView}>
      <Layout>
        <ScrollView>
          <ScrollView
            horizontal
            style={shareStyles.storyView}
            showsHorizontalScrollIndicator={false}>
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
            <Image
              style={shareStyles.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
              }}
            />
          </ScrollView>
          <View>
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
          </View>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const shareStyleSheet = StyleService.create({
  avatar: {
    height: 70,
    width: 70,
    marginRight: 15,
  },
  storyView: {
    width: '100%',
    flex: 1,
    marginTop: 10,
  },
});
export default Share;
