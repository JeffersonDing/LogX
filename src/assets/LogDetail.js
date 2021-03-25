import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  List,
  ListItem,
} from '@ui-kitten/components';
import {SafeAreaView, Image, View, BackHandler} from 'react-native';
import styleSheet from '../styles/styles';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';

const SwapIcon = (props) => <Icon {...props} fill="#118AB2" name="swap" />;

const LogDetail = ({route, navigation}) => {
  const detailStyles = useStyleSheet(detailStyleSheet);
  const styles = useStyleSheet(styleSheet);
  const {user, userData} = useContext(AuthContext);
  let params = route.params;
  const [logData, setLogData] = useState({
    band: null,
    comment: null,
    end: null,
    freq: null,
    from: null,
    from_cs: null,
    from_url: null,
    mode: null,
    pow: null,
    rst_r: null,
    rst_s: null,
    start: null,
    with: null,
    with_cs: null,
    with_url: null,
  });

  const getLogDetails = (valid, lid) => {
    return new Promise((res, rej) => {
      if (valid) {
        res(userData.contacts[lid]);
      } else {
        ref
          .child(`logs/pending/${lid}`)
          .once('value')
          .then((snapshot) => {
            res(snapshot.val());
          });
      }
    });
  };
  const handleAccept = (dat) => {
    ref
      .child(`logs/pending/${dat.lid}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        ref.child(`logs/verified/${dat.lid}`).set(data);
      })
      .then(() => {
        ref.child(`users/${user.uid}/notifications/${dat.loc}`).remove();
      })
      .then(() => {
        params.valid = true;
      });
  };

  const handleDecline = (dat) => {
    ref
      .child(`logs/pending/${dat.lid}`)
      .remove()
      .then(() => {
        ref.child(`users/${user.uid}/notifications/${dat.loc}`).remove();
      });
  };

  useEffect(() => {
    getLogDetails(params.valid, params.lid).then((res) => {
      setLogData(res);
    });
  }, [route.params]);
  const DATA = [
    {
      name: 'Band',
      description: logData.band,
      icon: 'bar-chart',
    },
    {
      name: 'Frequency',
      description: logData.freq,
      icon: 'mic',
    },
    {
      name: 'Mode',
      description: logData.mode,
      icon: 'options',
    },
    {
      name: 'Power',
      description: logData.pow,
      icon: 'bar-chart-2',
    },
    {
      name: 'Start Time',
      description: new Date(logData.start),
      icon: 'clock',
    },
    {
      name: 'End Time',
      description: new Date(logData.end),
      icon: 'clock',
    },
    {
      name: 'RST Sent',
      description: logData.rst_s,
      icon: 'log-out',
    },
    {
      name: 'RST Received',
      description: logData.rst_r,
      icon: 'log-in',
    },
    {
      name: 'Comment',
      description: logData.comment,
      icon: 'person',
    },
  ];

  const RenderItemIcon = (props) => (
    <Icon style={detailStyles.smicon} fill="#118AB2" name={props.icon} />
  );

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.name}`}
      description={`${item.description}`}
      accessoryLeft={() => <RenderItemIcon icon={item.icon} />}
    />
  );

  return (
    <SafeAreaView>
      <View style={detailStyles.container}>
        <View
          style={
            params.valid ? detailStyles.header : detailStyles.headerPending
          }>
          <View style={detailStyles.headerContent}>
            <View style={styles.col}>
              <Image
                style={detailStyles.avatar}
                source={{
                  uri: logData.from_url,
                }}
              />
              <Text style={detailStyles.name}>{logData.from_cs}</Text>
            </View>
            <View style={detailStyles.icon}>
              <SwapIcon />
            </View>
            <View style={styles.col}>
              <Image
                style={detailStyles.avatar}
                source={{
                  uri: logData.with_url,
                }}
              />
              <Text style={detailStyles.name}>{logData.with_cs}</Text>
            </View>
          </View>
        </View>

        <View style={detailStyles.bodyContent}>
          <List
            style={detailStyles.container}
            data={DATA}
            renderItem={renderItem}
          />
        </View>
        <View style={detailStyles.buttonContainer}>
          {params.valid ? (
            <Button
              style={detailStyles.cancel}
              onPress={() => {
                navigation.goBack();
              }}>
              Return
            </Button>
          ) : (
            <Button
              style={detailStyles.cancel}
              onPress={() => {
                handleDecline(params);
                navigation.goBack();
              }}>
              Decline
            </Button>
          )}
          {!params.valid && (
            <Button
              style={detailStyles.submit}
              onPress={() => handleAccept(params)}>
              Accept
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const detailStyleSheet = StyleService.create({
  header: {
    backgroundColor: 'color-success-default',
  },
  headerPending: {
    backgroundColor: 'color-danger-default',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  bodyContent: {
    flexDirection: 'column',
    padding: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  menuBox: {
    backgroundColor: '#DCDCDC',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
  },
  info: {
    fontSize: 22,
    color: '#696969',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  submit: {
    width: '40%',
    backgroundColor: 'color-success-default',
    borderWidth: 0,
  },
  cancel: {
    width: '40%',
    backgroundColor: 'color-danger-default',
    borderWidth: 0,
  },
  container: {
    maxHeight: 280,
  },
  smicon: {
    height: 30,
    width: 30,
  },
});

export default LogDetail;
