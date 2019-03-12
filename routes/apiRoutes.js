module.exports = function(router, Firebase) {
  const db = require("../models");
  const fborm = require("../firebase/orm/orm.js");
  router.get("/api/quotes", (req, res) => {
    db.Quotes.findAll({}).then(function(allQuotes) {
      res.json(allQuotes);
    });
  });

  router.get("/newquote", (req, res) => {
    console.log("Request to make new quote");
  });
  router.post("/api/newquote", (req, res) => {
    console.log(req.body);
    db.Users.findAll({
      attributes: ["id"],
      where: {
        name: req.body.quote_speaker
      }
    }).then(result => {
      if (result.length === 0) {
        console.log("User not found");
        res.send("User not found");
      } else {
        db.Quotes.create({
          quote_speaker: req.body.quote_speaker,
          quote_body: req.body.quote_body,
          UserId: result[0].id
        });
        res.send("SUCCESS");
      }
    });
  });

  router.post("/api/newwitness", async function(req, res) {
    const { statusCode, userRecord } = await fborm.currentUser(
      Firebase,
      req.session.idToken
    );
    const witnessDeleted = await db.Witness.destroy({
      where: {
        UserId: userRecord.uid,
        QuoteId: Number(req.body.quoteId)
      }
    });

    if (witnessDeleted === 0) {
      const witnessCreateResult = await db.Witness.create({
        UserId: userRecord.uid,
        QuoteId: Number(req.body.quoteId)
      });
      res.send({
        Witness: witnessCreateResult
      });
    } else {
      res.send({
        Witness: null,
        Deleted: userRecord.uid
      });
    }
  });

  router.get("/api/allquotes", async function(req, res) {
    const { statusCode, userRecord } = await fborm
      .currentUser(Firebase, req.session.idToken)
      .catch(err => {
        console.log("HERE");
        res.send(err);
      });

    const currentUserId = userRecord.uid;

    const friendResult = await db.Friendship.findAll({
      where: {
        UserId: currentUserId
      }
    });

    const friends = friendResult.map(friend => {
      return { UserId: { $eq: friend.FriendId } };
    });
    const quoteData = await db.Quotes.findAll({
      where: {
        $or: friends
      },
      include: [
        {
          model: db.Witness
        }
      ]
    }).map(quote => {
      quote.quote_body =
        quote.inflection !== null
          ? inflections[quote.inflection](quote.quote_body)
          : quote.quote_body;
      return quote;
    });

    res.send({
      quotes: quoteData,
      proPic: userRecord.photoURL
    });
  });
  router.post("/api/search/allusers", async function(req, res) {
    console.log(req.body);
    const possUsers = await db.Users.findAll({
      where: {
        name: {
          $regexp: `^${req.body.searchName}`
        }
      }
    });
    res.send(possUsers);
  });
  return router;
};
