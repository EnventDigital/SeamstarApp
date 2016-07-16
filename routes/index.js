
'use strict';

var pages = require('./pages');
var filters = require('./filters');
var auths = require('./auths');

/* views */
exports.index = {};
exports.index.tailors = pages.tailors;
exports.index.admin = pages.admin; 
exports.index.site = pages.site; 

/* auth filters */
exports.filter = {};
exports.filter.verify = filters.verify;
exports.filter.oauthify = filters.oauthify;


/* auth management */
exports.auth = {};
exports.auth.signin =  auths.signin;
exports.auth.signup = auths.signup;
exports.auth.passthru = auths.exchange;

