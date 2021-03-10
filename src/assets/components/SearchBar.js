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

const SearchIcon = (props) => <Icon {...props} fill="#8F9BB3" name="search" />;

const SearchBar = (props) => {
  const styles = useStyleSheet(styleSheet);
  const searchStyles = useStyleSheet(searchStyleSheet);
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.safeView}>
      <Layout style={styles.upper}>
        <View style={{...styles.row, ...searchStyles.cardBody}}>
          <Input
            placeholder="Search"
            style={searchStyles.searchbar}
            size="small"
            status="basic"
            value={value}
            onChangeText={(nextValue) => setValue(nextValue)}
          />
          <SearchIcon style={searchStyles.icon} />
        </View>
      </Layout>
    </SafeAreaView>
  );
};

const searchStyleSheet = StyleService.create({
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '90%',
  },
  icon: {
    height: 40,
    width: 40,
  },
  searchbar: {
    flex: 1,
  },
});

export default SearchBar;
