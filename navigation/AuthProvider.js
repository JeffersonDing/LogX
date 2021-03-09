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
                    data.user.updateProfile({
                      photoURL: url,
                    });
                  })
                  .then(() => {
                    ref.child(`users/${data.user.uid}/`).set({
                      info: {
                        first: first,
                        last: last,
                        cs: cs,
                        email: '',
                        address: {
                          country: '',
                          state: '',
                        },
                      },
                      contacts: {
                        '34a44374-7250-4fe0-a716-72f5ef025802': {
                          with: '',
                          time: 0,
                          status: false,
                        },
                      },
                      notifications: [
                        {
                          id: '34a44374-7250-4fe0-a716-72f5ef025802',
                          type: '',
                          msg: '',
                        },
                      ],
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
          auth()
            .signInWithCredential(googleCredential)
            .then((data) => {
              ref
                .child('users/')
                .once('value')
                .then((snapshot) => {
                  if (snapshot.child(data.user.uid).exists()) {
                    return;
                  } else {
                    const names = data.user.displayName.split(' ');
                    ref.child(`users/${data.user.uid}/`).set({
                      info: {
                        first: names[0],
                        last: names[names.length - 1],
                        cs: 'N/A',
                        email: data.user.email,
                        address: {
                          country: '',
                          state: '',
                        },
                      },
                      contacts: {
                        '34a44374-7250-4fe0-a716-72f5ef025802': {
                          with: '',
                          time: 0,
                          status: false,
                        },
                      },
                      notifications: [
                        {
                          id: '34a44374-7250-4fe0-a716-72f5ef025802',
                          type: '',
                          msg: '',
                        },
                      ],
                    });
                  }
                });
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
