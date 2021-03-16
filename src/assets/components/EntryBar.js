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
      </View>
    );
  };
  return (
    <View style={{...entryStyles.cardBody, ...props.style}}>
      <Input
        caption={props.text}
        value={props.value}
        style={entryStyles.searchbar}
        numberOfLines={props.lines || 1}
        textStyle={entryStyles.textStyle}
        onChangeText={(text) => props.onChangeText(text)}
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
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    color: 'black',
  },
});

export default EntryBar;
