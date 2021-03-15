import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import storage from '@react-native-firebase/storage';
import {ref} from '../src/helpers/RealTimeDB';

export const AuthContext = createContext({});

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'openid',
  ],
  webClientId:
    '344769371871-bvbu4vb0bbhnvj24o5vatl727j96afv3.apps.googleusercontent.com',
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    contacts: '',
    info: {
      address: '',
      cs: '',
      email: '',
      first: '',
      last: '',
      pfp: '',
    },
    notifications: [''],
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        login: async (email, password) => {
          await auth().signInWithEmailAndPassword(email, password);
        },
        register: (email, password, first, last, cs) => {
          try {
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then((data) => {
                storage()
                  .ref('/public/avatar.png')
                  .getDownloadURL()
                  .then((url) => {
                    ref.child(`users/${data.user.uid}/`).set({
                      info: {
                        first: first,
                        last: last,
                        cs: cs.toUpperCase(),
                        email: email,
                        photoURL: url,
                        address: {
                          country: '',
                          state: '',
                        },
                      },
                      contacts: {
                        _INIT_: data.user.uid,
                      },
                      notifications: {
                        _INIT_: data.user.uid,
                      },
                    });
                  });
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
        GLogin: async () => {
          const {idToken} = await GoogleSignin.signIn();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          auth().signInWithCredential(googleCredential);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
