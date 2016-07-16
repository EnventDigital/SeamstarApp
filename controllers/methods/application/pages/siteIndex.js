var db;
var _self;

module.exports = function(next){

    console.log('all cookies: -> ', this.getRequestProp('cookies'));	

    this.getResponse().render('site', {title:"Seamstar - Home"});
    this.terminateControl();
};