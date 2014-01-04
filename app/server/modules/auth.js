//middleware to check if user is authenticated into page
var AM = require('./account-manager');

exports.sessionCheck = function(req, res, next){
	//console.log(req.session);
	AM.sessionAuth(req.cookies['connect.sid'],req.session, function(valid){
		if(valid != null) next();
		else res.redirect('/login');
	})

}

//returns 400
exports.authCheck = function(req, res, next){ // This should be able to handle both a session/cookie auth or an api key auth
	console.log('Checking Auth');
	var key = req.params.key;
	if(req.header('X-Apikey')!=null){
		console.log('Checking API KEY');
		AM.userByApiKey(req.header('X-Apikey'), function(valid){
			if(valid != null){
				req.user = valid;
				next();
			} 
			else res.send('not-authorized',403);
			});
	}else if(key !=null){
		console.log('Checking API KEY');
		AM.userByApiKey(key, function(valid){
			if(valid != null){
				req.user = valid;
				next();
			} 
			else res.send('not-authorized',403);
			});
	}
	else{
		AM.sessionAuth(req.cookies['connect.sid'],req.session, function(valid){
			if(valid != null){
				req.user = valid;
				next();
			} 
			else res.send('not-authorized',403);
		});
	}
}