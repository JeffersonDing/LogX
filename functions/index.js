const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./admin.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://logx-472fa-default-rtdb.firebaseio.com',
});
const db = admin.database();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.handleLog = functions.database
  .ref('/logs/pending/{id}')
  .onCreate((snap, context) => {
    const data = snap.val();
    return db
      .ref()
      .child(`users/${data.with}/notifications/${data.from}/${snap.key}`)
      .set({
        id: snap.key,
        time: new Date().getTime(),
      })
      .catch((e) => {
        functions.logger.error(e);
      });
  });

exports.handleAccept = functions.database
  .ref('/logs/verified/{id}')
  .onCreate((snap, context) => {
    const data = snap.val();
    return db
      .ref()
      .child(`users/${data.from}/contacts/${snap.key}`)
      .set(data)
      .then(() => {
        db.ref().child(`users/${data.with}/contacts/${snap.key}`).set(data);
      })
      .then(() => {
        db.ref().child(`logs/pending/${snap.key}`).remove();
      })
      .then(() => {
        db.ref().child(`logs/verified/${snap.key}`).remove();
      })
      .catch((e) => {
        functions.logger.error(e);
      });
  });
