import React, {useState, useContext} from 'react';
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  StyleService,
  useStyleSheet,
  Input,
} from '@ui-kitten/components';
import {AuthContext} from '../../navigation/AuthProvider';

const Login = ({navigation}) => {
  const styles = useStyleSheet(LoginStyleSheet);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {GLogin, login} = useContext(AuthContext);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>LogX</Text>
              <Input
                placeholder="Username"
                value={userName}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={(nextValue) => setUserName(nextValue)}
              />
              <Input
                placeholder="Password"
                value={password}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={(nextValue) => setPassword(nextValue)}
                secureTextEntry={true}
              />
              <Text style={styles.error}>{error}</Text>
              <Button
                style={styles.loginButton}
                onPress={() => {
                  setError('Loading...');
                  if (userName && password) {
                    login(userName, password).catch((e) => {
                      setError(e.message.split('] ')[1]);
                    });
                  } else {
                    setError('Invalid Input');
                  }
                }}>
                Log In
              </Button>
              <Button style={styles.GLoginButton} onPress={() => GLogin()}>
                Login with Google
              </Button>
              <Button
                style={styles.registerButton}
                onPress={() => navigation.navigate('Register')}>
                Register
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
    paddingRight: 10,
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
  registerButton: {
    backgroundColor: 'color-info-default',
    width: '70%',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  GLoginButton: {
    backgroundColor: '#3897f1',
    height: 45,
    width: '70%',
    marginTop: 10,
  },
  error: {
    width: '90%',
    fontSize: 14,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    color: 'color-danger-default',
  },
});
export default Login;
