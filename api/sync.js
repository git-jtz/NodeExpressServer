var querystring = require('querystring');
var https = require('https');
var fs = require('fs');
var path = require('path');


var DOWNLOAD_DIR = "E:\\data\\";

function getHostname(token)
{
	return token.Subdomain + ".sf-api.com";
}


function syncFile(token, itemId, itemName, cb)
{
	var uri = "https://" + getHostname(token) + "/sf/v3/Items(" + itemId + ")/Download";
	console.log("Download api uri: " + uri);
	
	var header = {
		'Authorization' : "Bearer " + token.AccessToken
	};
	var options = {
		hostname : getHostname(token),
		path : "/sf/v3/Items(" + itemId + ")/Download",
		method : "GET",
		headers : header
	};
	
	var file_name = path.basename(itemName);
	var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
	
	var success = false;
	var req = https.request(options, function(res) {
		var redirect = res.headers['location'];

		if(redirect === undefined){
			req.end();
		}
		console.log("redirect uri: " + redirect);
		var reqFile = https.get(redirect, function(resFile){
			resFile.pipe(file);
			resFile.on('end', function(){
				cb(true);
				console.log('File ' + itemName + ' successfully downloaded.');
			});
			resFile.on('error', function(e) {
				console.error("File download error: " + e);
				cb(false);
			});
			
		});
		reqFile.on('error', function(e) {
			console.error(e);
			cb(false);
		});
		reqFile.end();
	});
	
	req.on('error', function(e) {
		console.error(e);
		cb(false);
	});
	req.end();
}
module.exports = syncFile;