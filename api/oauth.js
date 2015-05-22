var querystring = require('querystring');
var https = require('https');

//authentication parameters
var params = {
	grant_type : 'password',
	client_id : 'nyldhcPG2UkeIKgcFfmc4uI71m97ESe4',
	client_secret : 'xGHwxwbqBIVxg4ikRLeJOxz1HXcIjkxWGx41cpVEuh7XVoeo',
	username : 'test@test.com',
	password : '*******'
};
var hostname = 'host.name.com'
var headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
};

//authenticate and get api token
function Authenticate(username, password, callback)
{
	params.username = username;
	params.password = password;
	
	var options = 
	{
		host: hostname,
		path: '/oauth/token?' + querystring.stringify(params),
		method: 'GET',
		headers: headers
	};
	console.log(options.path);
	
	var req = https.request(options, function(res) {
		res.setEncoding('utf-8');

		var responseString = '';

		res.on('data', function(data) {
		  responseString += data;
		});
		
		res.on('end', function() {
			console.log(responseString);
			var result = JSON.parse(responseString);
			
			var response = {
				AccessToken : result.access_token,
				RefreshToken : result.refresh_token,
				TokenType : result.token_type,
				Appcp : result.appcp,
				Apicp : result.apicp,
				Subdomain : result.subdomain,
				ExpiresIn : result.expires_in
			};
			callback(response);
		});
	});
	req.end();
}
// Authenticate(function(result){
	// console.log(result);
// });
module.exports = Authenticate;