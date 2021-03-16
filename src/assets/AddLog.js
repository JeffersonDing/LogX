import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import Picker from '@react-native-community/datetimepicker';
import styleSheet from '../styles/styles';
import EntryBar from './components/EntryBar';
import DateTimePicker from './components/DateTimePicker';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';

const AddLog = ({route, navigation}) => {
  const styles = useStyleSheet(styleSheet);
  const {user, userData} = useContext(AuthContext);
  const addStyles = useStyleSheet(addStyleSheet);
  const data = route.params;
  const [mode, setMode] = useState('date');
  const [endMode, setEndMode] = useState('date');
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [formData, setFormData] = useState({
    from: user.uid,
    with: data.uid,
    from_cs: userData.info.cs,
    with_cs: data.cs,
    from_url: userData.info.photoURL,
    with_url: data.photoURL,
    start: new Date(),
    end: new Date(),
    band: null,
    freq: null,
    mode: null,
    pow: null,
    rst_s: null,
    rst_r: null,
    comment: null,
  });
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.start;
    setShow(Platform.OS === 'ios');
    setFormData({...formData, start: currentDate});
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.end;
    setEndShow(Platform.OS === 'ios');
    setFormData({...formData, end: currentDate});
  };

  const endShowMode = (currentMode) => {
    setEndShow(true);
    setEndMode(currentMode);
  };

  const ShowEndDatepicker = () => {
    endShowMode('date');
  };

  const ShowEndTimepicker = () => {
    endShowMode('time');
  };
  const pushLog = () => {
    const pushData = {
      ...formData,
      start: formData.start.getTime(),
      end: formData.end.getTime(),
    };
    ref
      .child('logs/pending')
      .push(pushData)
      .then(() => {
        navigation.goBack();
        setFormData({
          from: user.uid,
          with: data.uid,
          start: new Date(),
          end: new Date(),
          band: null,
          freq: null,
          pow: null,
          rst_s: null,
          rst_r: null,
          comment: null,
        });
      });
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <Layout style={styles.center}>
        <Layout style={addStyles.container}>
          <View style={addStyles.row}>
            <EntryBar text="QSO With" icon="person" value={data.cs} disabled />
          </View>
          <View style={{...addStyles.row, ...addStyles.time}}>
            <View style={addStyles.col}>
              <TouchableOpacity
                style={addStyles.picker}
                onPress={showDatepicker}>
                <DateTimePicker
                  caption="Start Date"
                  text={`${
                    months[formData.start.getMonth()]
                  } ${formData.start.getDate().toString()}`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={addStyles.picker}
                onPress={showTimepicker}>
                <DateTimePicker
                  caption="Start Time"
                  text={`${formData.start
                    .getHours()
                    .toString()}:${formData.start.getMinutes().toString()}`}
                />
              </TouchableOpacity>
            </View>
            <View style={addStyles.col}>
              <TouchableOpacity
                style={addStyles.picker}
                onPress={ShowEndDatepicker}>
                <DateTimePicker
                  caption="End Date"
                  text={`${
                    months[formData.end.getMonth()]
                  } ${formData.end.getDate().toString()}`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={addStyles.picker}
                onPress={ShowEndTimepicker}>
                <DateTimePicker
                  caption="End Time"
                  text={`${formData.end
                    .getHours()
                    .toString()}:${formData.end.getMinutes().toString()}`}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={addStyles.row}>
            <EntryBar
              text="Band"
              icon="bar-chart"
              value={formData.band}
              onChangeText={(text) => setFormData({...formData, band: text})}
            />
            <EntryBar
              text="Freq."
              icon="mic"
              value={formData.freq}
              onChangeText={(text) => setFormData({...formData, freq: text})}
            />
          </View>
          <View style={addStyles.row}>
            <EntryBar
              text="Power"
              icon="bar-chart-2"
              value={formData.pow}
              onChangeText={(text) => setFormData({...formData, pow: text})}
            />
            <EntryBar
              text="Mode"
              icon="options"
              value={formData.mode}
              onChangeText={(text) => setFormData({...formData, mode: text})}
            />
          </View>
          <View style={addStyles.row}>
            <EntryBar
              text="RST Sent"
              icon="log-out"
              value={formData.rst_s}
              onChangeText={(text) => setFormData({...formData, rst_s: text})}
            />
            <EntryBar
              text="RST Recv."
              icon="log-in"
              value={formData.rst_r}
              onChangeText={(text) => setFormData({...formData, rst_r: text})}
            />
          </View>

          <View style={{...addStyles.row, ...addStyles.comments}}>
            <EntryBar
              text="Comments"
              icon="person"
              lines={5}
              value={formData.comment}
              onChangeText={(text) => setFormData({...formData, comment: text})}
            />
          </View>
          <View style={addStyles.buttonContainer}>
            <Button
              style={addStyles.cancel}
              onPress={() => {
                navigation.goBack();
                setFormData({
                  from: user.uid,
                  with: data.uid,
                  start: new Date(),
                  end: new Date(),
                  band: null,
                  freq: null,
                  pow: null,
                  rst_s: null,
                  rst_r: null,
                  comment: null,
                });
              }}>
              Cancel
            </Button>
            <Button style={addStyles.submit} onPress={() => pushLog()}>
              Submit
            </Button>
          </View>
        </Layout>
      </Layout>
      {show && (
        <Picker
          testID="dateTimePicker"
          value={formData.start}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {endShow && (
        <Picker
          testID="endDateTimePicker"
          value={formData.end}
          mode={endMode}
          is24Hour={true}
          display="default"
          onChange={onEndChange}
        />
      )}
    </SafeAreaView>
  );
};

const addStyleSheet = StyleService.create({
  container: {
    height: 600,
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
    widht: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  clock: {
    flex: 1,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'color-primary-transparent-200',
  },
  comments: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submit: {
    width: '40%',
    borderWidth: 0,
  },
  cancel: {
    width: '40%',
    backgroundColor: 'color-danger-default',
    borderWidth: 0,
  },
  picker: {
    flex: 1,
  },
  time: {
    flex: 1.4,
  },
});
export default AddLog;
