import database from '@react-native-firebase/database';
export const ref = database().ref();

export const getData = (uid) => {
  return new Promise((resolve, reject) => {
    ref
      .child(`users/${uid}`)
      .once('value')
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch(() => {
        reject('unable to access data');
      });
  });
};
