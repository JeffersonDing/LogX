import React from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Card,
  Avatar,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const Feed = (props) => {
  const styles = useStyleSheet(styleSheet);
  const feedStyles = useStyleSheet(feedStyleSheet);
  const Header = () => (
    <View style={{...styles.row, ...feedStyles.feedCardHeader}}>
      <Avatar style={feedStyles.avatar} source={props.pfp} />
      <View style={{...styles.column, ...feedStyles.names}}>
        <Text category="h6" style={styles.textWhite}>
          {props.name}
        </Text>
        <Text category="h4" style={styles.textWhite}>
          {props.callSign}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.safeView}>
      <Layout style={styles.upper}>
        <Card style={feedStyles.feedCard} header={Header}>
          <View style={feedStyles.cardBody}>
            <Text category="s1" style={styles.textBlack}>
              {props.text}
            </Text>
            <View style={feedStyles.imageContainer}>
              <Image source={props.img} style={styles.image} />
            </View>
          </View>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

const feedStyleSheet = StyleService.create({
  feedCard: {
    margin: 2,
    marginTop: 20,
    marginBottom: 10,
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  feedCardHeader: {
    backgroundColor: 'color-info-500',
  },
  avatar: {
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    width: 50,
  },
  cardBody: {
    alignItem: 'flex-start',
    height: '80%',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
  },
  names: {
    paddingTop: 4,
    paddingBotton: 4,
  },
});

export default Feed;
