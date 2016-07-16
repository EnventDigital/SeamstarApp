var db;
var _self;

module.exports = function(next){

    console.log('all cookies: ', this.getRequestProp('cookies'));
 
    this.getResponse().render('admin', {title:"Seamstar - Admin", banner:""});
    this.terminateControl();
};