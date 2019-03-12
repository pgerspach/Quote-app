module.exports = function(router, Firebase) {
  const db = require("../models");
  const fborm = require("../firebase/orm/orm.js");
  const inflections = require("../quote_modules/inflections.js");

  // Listen for post request for google sign in
  router.post("/auth/google", async function(req, res) {
    const data = await fborm.signIn(Firebase, req.body.token).catch(err => {
      console.log("mistake D");
      res.send(err);
    });

    if (data.statusCode === 404) {
      console.log("Throwingerrorhere");
      throw data.error;
    }

    req.session.idToken = data.idToken;
    req.session.gapiObj = req.body.gapiObj;
    const { statusCode, userRecord } = await fborm
      .currentUser(Firebase, req.session.idToken)
      .catch(err => {
        console.log("mistake E");
        res.send(err);
      });

    loadData(statusCode, userRecord);

    // Try to sign in with token from client
    async function loadData(statusCode, userRecord) {
      let userId = userRecord.uid;
      const loginUser = await db.Users.findAll({
        where: {
          id: userId // user Id from firebase token
        }
      }).catch(err => {
        console.log("mistake C");
        res.send(err);
      });

      if (loginUser.length === 0) {
        // if there is no user with that token, create a new user in mysql
        let newUser = userRecord.displayName;
        let photoURL = userRecord.photoURL;

        await db.Users.create({
          id: userId,
          name: newUser,
          proPic: photoURL
        }).catch(err => {
          console.log("mistake B");
          res.send(err);
        });

        await db.Friendship.bulkCreate([
          {
            UserId: userId,
            FriendId: "23",
            status: 2
          },
          {
            UserId: userId,
            FriendId: "123",
            status: 2
          },
          {
            UserId: userId,
            FriendId: "54",
            status: 2
          },
          {
            UserId: userId,
            FriendId: "12364",
            status: 2
          },
          {
            UserId: userId,
            FriendId: "542",
            status: 2
          }
        ]).catch(err => {
          console.log("mistake A");
          res.send(err);
        });

        res.send("OK");
      } else {
        res.send("OK");
      }
    }
  });

  router.post("/auth/signout", (req, res) => {
    const gapiObj = req.session.gapiObj;
    req.session.destroy();
    res.send(gapiObj);
  });

  return router;
};
