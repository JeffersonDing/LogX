import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Card,
  Icon,
  Input,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const SearchBar = (props) => {
  const styles = useStyleSheet(styleSheet);
  const searchStyles = useStyleSheet(searchStyleSheet);
  const SearchIcon = () => (
    <Icon style={searchStyles.icon} fill="#8F9BB3" name="search" />
  );
  return (
    <Layout style={styles.upper}>
      <View style={searchStyles.cardBody}>
        <Input
          placeholder="Search"
          style={searchStyles.searchbar}
          size="small"
          status="basic"
          value={props.query}
          onChangeText={(nextValue) => props.onChangeText(nextValue)}
          accessoryLeft={SearchIcon}
        />
      </View>
    </Layout>
  );
};

const searchStyleSheet = StyleService.create({
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '90%',
  },
  icon: {
    height: 25,
    width: 25,
  },
  searchbar: {
    flex: 1,
    height: '100%',
  },
});

export default SearchBar;
