import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Image,
  Text,
  Card,
  Icon,
  Avatar,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const ArrowIcon = (props) => (
  <Icon style={props.icon} fill="#8F9BB3" name="chevron-right" />
);

const LogListItem = (props) => {
  const styles = useStyleSheet(styleSheet);
  const itemStyles = useStyleSheet(itemStyleSheet);
  const navigationPage = (search) => {
    if (search) {
      props.navigation.navigate('AddLog', {
        uid: props.uid,
        cs: props.cs,
        name: props.name,
        country: props.country,
        photoURL: props.href,
      });
    } else {
      props.navigation.navigate('LogDetails', {
        lid: props.logid,
        valid: true,
      });
    }
  };
  return (
    <Card style={props.style} onPress={() => navigationPage(props.search)}>
      <View style={itemStyles.container}>
        <View style={styles.row}>
          <Avatar source={{uri: props.href}} style={itemStyles.avatar} />
          <Text category="h5" style={itemStyles.textBox}>
            {props.cs}
          </Text>
          <View style={{...styles.col, ...itemStyles.nameAddr}}>
            <Text>{props.name}</Text>
            <Text>{props.country}</Text>
          </View>
        </View>
        <ArrowIcon icon={itemStyles.icon} />
      </View>
    </Card>
  );
};

const itemStyleSheet = StyleService.create({
  avatar: {
    height: 40,
    width: 40,
    marginRight: 15,
  },
  nameAddr: {
    alignItems: 'flex-start',
    width: 90,
    marginLeft: 8,
  },
  icon: {
    height: 40,
    width: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textBox: {
    width: 90,
  },
});

export default LogListItem;
