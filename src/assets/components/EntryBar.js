import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Icon,
  Input,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const EntryBar = (props) => {
  const styles = useStyleSheet(styleSheet);
  const entryStyles = useStyleSheet(entryStyleSheet);
  const EntryTitle = () => {
    return (
      <View style={styles.row}>
        <Icon style={entryStyles.icon} fill="#8F9BB3" name={props.icon} />
        <Text>{props.text}</Text>
      </View>
    );
  };
  return (
    <View style={{...entryStyles.cardBody, ...props.style}}>
      <Input
        placeholder={props.text}
        style={entryStyles.searchbar}
        textStyle={entryStyles.textStyle}
        value={props.value}
        accessoryLeft={EntryTitle}
        size="small"
        status="basic"
        disabled={props.disabled}
      />
    </View>
  );
};

const entryStyleSheet = StyleService.create({
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '90%',
  },
  icon: {
    height: 20,
    width: 20,
  },
  searchbar: {
    flex: 1,
    margin: 2,
  },
  textStyle: {
    fontSize: 16,
  },
});

export default EntryBar;
