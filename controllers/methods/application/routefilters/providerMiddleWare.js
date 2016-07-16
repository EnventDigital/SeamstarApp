

module.exports = function(next){

         var details = null;
         var reqbody = this.getRequestProp('body');
		 var cryptojs = this.getPackage('crypto-js');
         var err = new Error(' ');

         switch(this.param){
            case "facebook":
            case "google":
            case "instagram":
            case "twitter":
                details = {
                    accessTokenUrl:process.env[this.param.toUpperCase()+'_OAUTH_CLIENT_TOKEN_URL'];
               };
            break;
            default:
              err.status = 404;
              retrun next(err);
            break;
         }

		 if(this.param != "twitter"){ // OAuth 2.0
			 details.acessTokenUrlParams = {
			   client_id: reqbody.clientId,
			   redirect_uri: reqbody.redirectUri,
			   client_secret: process.env[this.param.toUpperCase()+'_OAUTH_CLIENT_SECRET'],
			   code: reqbody.code,
			   grant_type: 'authorization_code'
			 };
	     }else{ // OAuth 1.0
		     // Twitter OAuth 1.0 implementation says that we sign the request using HMAC_SHA1 only
			 // HTTP_METHOD + HTTP_URL + HTTP_QUERY_STRING_PARAMS  (each must be arranged lexicographically)
		 }		 

         this.setRequestProp('providerData', details);
         this.setRequestProp('providerName', param);
         next();


}