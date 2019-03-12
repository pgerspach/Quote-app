module.exports = {
  signIn: (Firebase, token) => {
    var credential = Firebase.firebase.auth.GoogleAuthProvider.credential(
      token
    );
    return new Promise(async function(resolve, reject) {
      await Firebase.firebase
        .app()
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          reject({
            statusCode: 404,
            error: error
          });
        });

      const idToken = await Firebase.firebase
        .auth()
        .currentUser.getIdToken()
        .catch(error => {
          reject({
            statusCode: 404,
            error: error
          });
        });

      resolve({
        statusCode: 200,
        idToken: idToken
      });
    });
  },
  currentUser: (Firebase, idToken) => {
    return new Promise(async function(resolve, reject) {
      const decodedToken = await Firebase.admin
        .auth()
        .verifyIdToken(idToken)
        .catch(error => {
          reject({
            statusCode: 404,
            error: error
          });
        });

      const userRecord = await Firebase.admin
        .auth()
        .getUser(decodedToken.uid)
        .catch(error => {
          reject({
            statusCode: 404,
            error: decodedToken
          });
        });

      resolve({
        statusCode: 200,
        userRecord: userRecord
      });
    });
  }
};
