var UserAuthController = require("../controllers/UserAuthController.js");

exports.signup = UserAuthController("@registerServiceUser", [
   'model:::User'
]);

exports.signin = UserAuthController("@loginServiceUser", [
	'model:::User'
]);

exports.exchange = UserAuthController("@authenticateServiceUser", [
   'model:::User'
]);
