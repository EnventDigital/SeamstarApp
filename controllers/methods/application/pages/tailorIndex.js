var db;
var _self;

module.exports = function(next){

 
    this.getResponse().render();
    this.terminateControl();
};