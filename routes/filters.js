var AccessControlController = require("../controllers/AccessControlController.js");

exports.verify =  AccessControlController("@verifyAuthenticated", [
    process.env.APP_SECRET,
    'model:::User'
]);

exports.oauthify = AccessControlController("@verifyOAuthRedirect", [
    process.env.DEBUG_ON
]);

/*exports. = AccessControlController("@", [
  
]);*/
