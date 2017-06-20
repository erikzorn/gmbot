const http = require('http');
const rl = require('readline');
/*
var HTTPS = require('https');

var theUrl = http://www.cleverbot.com/getreply?key=CC2szqo8wJx9YX2uLlfEgMpcN-g

 options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });


var theUrl = "http://www.cleverbot.com/getreply?key=CC2szqo8wJx9YX2uLlfEgMpcN-g";

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText);
*/
var str;
var input;
var theUrl;
var cState = "";
//while(true) {
	str = process.argv[2];
	input = str.split(' ').join('+');
	theUrl = "http://www.cleverbot.com/getreply?key=CC2szqo8wJx9YX2uLlfEgMpcN-g" + "&input=" + input + "&cs=" + cState;


	http.get(theUrl, (res) => {
	  const { statusCode } = res;
	  const contentType = res.headers['content-type'];
	  //console.log(JSON.parse(res));

	  res.setEncoding('utf8');
	  let rawData = '';
	  res.on('data', (chunk) => { rawData += chunk; });
	  res.on('end', () => {
	    try {
	      const parsedData = JSON.parse(rawData);
	      console.log(parsedData);
	      console.log(parsedData["output"]);
	      cState = parsedData["conversation_id"]
	    } catch (e) {
	      console.error(e.message);
	    }
	  });
	});
//}




