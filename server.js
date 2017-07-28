var http = require("http");
var url = require("url");
var path = require("path");
var textract = require('textract');
var logger = function(type, message){
	console.log(type + ": " + message);
	console.log("------------------------");
};
http.createServer(function(request, response){
	if ( request.method === "POST" ) {
		var body;
		request.on("data", function(data){
			body = JSON.parse(data);
        });
		request.on("end", function(){
			try {
				var buffer = new Buffer(body.content);
				textract.fromBufferWithMime(body.contentType, buffer, function(error, text){
					logger("Notice", "Successfully received file contents");
					response.setHeader('Access-Control-Allow-Origin', '*');
					response.writeHead(200, {'Content-Type': body.contentType});
					response.write(text);
					response.end();
					logger("Notice", "Successfully sent textract message back to client");
				});
			} catch(error){
				logger("Error", error);
			}
        });
	}
}).listen(8080, "127.0.0.1", function(){
    logger("Notice", "Awaiting Data");
});
