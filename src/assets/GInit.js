import React, {useState, useContext} from 'react';
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Button,
  StyleService,
  useStyleSheet,
  Input,
} from '@ui-kitten/components';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';

const GInit = (props) => {
  const styles = useStyleSheet(LoginStyleSheet);
  const [cs, setCs] = useState('');
  const [name, setName] = useState({first: '', last: ''});
  const [error, setError] = useState('');

  const {user, logout} = useContext(AuthContext);
  const handleRegister = () => {
    setError('Loading...');
    fetch(`http://api.hamdb.org/${cs}/json/LogX`)
      .then((json) => {
        return json.json();
      })
      .then((data) => {
        if (data.hamdb.callsign.name !== name.last) {
          setError('Call Sign or name invalid');
          return;
        } else {
          ref.child(`users/${user.uid}/`).set({
            info: {
              first: name.first,
              last: name.last,
              cs: cs.toUpperCase(),
              email: user.email,
              photoURL: user.photoURL,
              address: {
                country: '',
                state: '',
              },
            },
            contacts: {
              _INIT_: user.uid,
            },
            notifications: {
              _INIT_: user.uid,
            },
          });
        }
      })
      .then(() => {
        props.onComplete();
      });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>LogX</Text>
              <View style={styles.row}>
                <Input
                  placeholder="First Name"
                  value={name.first}
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInputName}
                  secureTextEntry={false}
                  onChangeText={(nextValue) =>
                    setName({first: nextValue, last: name.last})
                  }
                />
                <Input
                  placeholder="Last Name"
                  value={name.last}
                  placeholderColor="#c4c3cb"
                  style={styles.loginFormTextInputName}
                  secureTextEntry={false}
                  onChangeText={(nextValue) =>
                    setName({first: name.first, last: nextValue})
                  }
                />
              </View>
              <Input
                placeholder="Call Sign"
                value={cs}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={false}
                onChangeText={(nextValue) => setCs(nextValue)}
              />
              <Text style={styles.error}>{error}</Text>
              <Button
                style={styles.loginButton}
                onPress={() => handleRegister()}>
                Complete Registration
              </Button>
              <Button style={styles.cancelButton} onPress={() => logout()}>
                Cancel Registratoin
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const LoginStyleSheet = StyleService.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
    alignItems: 'center',
  },
  loginFormTextInput: {
    height: 43,
    width: '90%',
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginFormTextInputName: {
    height: 43,
    width: '41%',
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: 'color-primary-default',
    width: '70%',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'color-danger-default',
    borderWidth: 0,
    width: '70%',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  error: {
    color: 'color-danger-default',
  },
});
export default GInit;
