var AppController = require('../controllers/AppController.js');


exports.admin = AppController("@adminIndex", [

]);

exports.site = AppController("@siteIndex", 
 
]);

exports.tailors = AppController("@tailorIndex", [
  
]);