
module.exports = function(next){


   this.setRequestProp('consumerType', this.param);   
   next();

};