var RouteFilterController = require('../controllers/RouteFilterController.js');

component = {

	"role": RouteFilterController("@roleMiddleWare" [
	
	]),

	"oauthprovider": RouteFilterController("@providerMiddleWare", [
	     
	])

};

module.exports = component;