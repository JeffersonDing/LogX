import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {StyleService, useStyleSheet, Layout, Text} from '@ui-kitten/components';
import styleSheet from '../styles/styles';
import EntryBar from './components/EntryBar';

const AddLog = ({route, navigation}) => {
  const styles = useStyleSheet(styleSheet);
  const addStyles = useStyleSheet(addStyleSheet);
  const data = route.params;
  return (
    <SafeAreaView style={styles.safeView}>
      <Layout style={styles.center}>
        <Layout style={addStyles.container}>
          <View style={addStyles.row}>
            <EntryBar text="QSO With" icon="person" value={data.cs} disabled />
          </View>
          <Text style={addStyles.sectionName}>Details</Text>
          <View style={addStyles.row}>
            <View style={addStyles.col}>
              <EntryBar text="Start" icon="clock" />
              <EntryBar text="End" icon="clock" />
            </View>
            <View style={addStyles.clock}>
              <Text>CLock</Text>
            </View>
          </View>
          <View style={addStyles.row}>
            <EntryBar text="Band" icon="bar-chart" />
            <EntryBar text="Freq." icon="mic" />
          </View>
          <View style={addStyles.row}>
            <EntryBar text="Power" icon="bar-chart-2" />
          </View>
          <Text style={addStyles.sectionName}>RST</Text>
          <View style={addStyles.row}>
            <EntryBar text="Sent" icon="log-out" />
            <EntryBar text="Recv." icon="log-in" />
          </View>

          <View style={addStyles.row}>
            <EntryBar text="Comments" icon="person" />
          </View>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const addStyleSheet = StyleService.create({
  input: {},
  container: {
    height: '90%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  row: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    flex: 1,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'color-primary-transparent-200',
  },
  sectionName: {
    fontSize: 25,
  },
});
export default AddLog;
