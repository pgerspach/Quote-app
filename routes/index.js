module.exports = function(router, Firebase){
    router = require("../routes/authRoutes.js")(router, Firebase);
    router = require("./apiRoutes")(router, Firebase);
    return router;
};
