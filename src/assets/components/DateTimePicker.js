import React from 'react';
import {View} from 'react-native';
import {StyleService, useStyleSheet, Icon, Input} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const DateTimePicker = (props) => {
  const styles = useStyleSheet(styleSheet);
  const pickerStyles = useStyleSheet(pickerStyleSheet);
  const EntryTitle = () => {
    return (
      <View style={styles.row}>
        <Icon style={pickerStyles.icon} fill="#8F9BB3" name="clock" />
      </View>
    );
  };
  return (
    <View style={{...pickerStyles.cardBody, ...props.style}}>
      <Input
        value={props.text}
        style={pickerStyles.searchbar}
        textStyle={pickerStyles.textStyle}
        caption={props.caption}
        accessoryLeft={EntryTitle}
        size="small"
        status="basic"
        disabled={true}
      />
    </View>
  );
};

const pickerStyleSheet = StyleService.create({
  cardBody: {
    flex: 1,
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
    fontSize: 16,
    color: 'black',
  },
});

export default DateTimePicker;
