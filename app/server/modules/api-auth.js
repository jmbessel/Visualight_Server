//middleware to check if user is authenticated into page
var AM = require('./account-manager');


//returns 400
exports.validateApiKey = function(req, res, next){ // This should be able to handle both a session/cookie auth or an api key auth
	console.log('Checking API KEY');
	AM.findByApiKey(req.header('X-Apikey'), function(valid){
		if(valid === true) next();
		else res.send('not-authorized',403);
	})
}