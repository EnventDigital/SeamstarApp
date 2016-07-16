/*var mongoose = require("mongoose");*/
var app;

require('dotenv').load();

var path = require('path');
var compress = require('compression');
var express = require('express');
var schedule = require("node-schedule");
/* Third-party middlewares */
var favicon = require('serve-favicon');
var cookiePs = require('cookie-parser');
var bodyPs = require('body-parser');
//var methOverride = require('method-override');
var cors = require('cors');
var multer = require('multer');

module.exports = app = express();


app.set('port', process.env.PORT || 3001);

//app.use(cors());
app.use(compress());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.midsection = 'Okay!';

app.use(favicon(__dirname + '/public/favicon.ico'));
/*app.use(methOverride());*/

app.use(bodyPs.json()); // for mime-type: application/json (especially for xAPI Statements)
app.use(bodyPs.urlencoded({extended:true})); // for mime-type: application/x-www-form-urlencoded
// multer({'dest':''}).single('') for mime-type: multipart/formdata
app.use(cookiePs()); // for cookies!!

/*
  var rule = new schedule.RecurrenceRule();
  rule.minute = 1440; // 24 hrs
  // rule.second = 0;
  var job = schedule.scheduleJob(rule, function(){
      console.log("cleared belated json files in {more} folder !!!");
      //job.cancel();
  });

*/

app.use(express.static(path.join(__dirname, "public"), {
   dotfiles: 'ignore',
   etag: true,
   extensions: [],
   index: false,
   maxAge: 2628000000,
   redirect: false,
   setHeaders: function (res, path, stat) {
     res.set('x-last-access-timestamp', Date.now());
   }
}));

