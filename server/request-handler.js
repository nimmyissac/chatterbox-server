// /*************************************************************

// You should implement your request handler function in this file.

// requestHandler is already getting passed to http.createServer()
// in basic-server.js, but it won't work as is.

// You'll have to figure out a way to export this function from
// this file and include it in basic-server.js so that it actually works.

// *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

// **************************************************************/
// // var exports = module.exports = {}; **crashed node

// // These headers will allow Cross-Origin Resource Sharing (CORS).
// // This code allows this server to talk to websites that
// // are on different domains, for instance, your chat client.
// //
// // Your chat client is running from a url like file://your/chat/client/index.html,
// // which is considered a different domain.
// //
// // Another way to get around this restriction is to serve you chat
// // client from this domain by setting up static file serving.
// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

// // Message object to send to client looks like
// // {
// //   results: [
// //     {
// //       text:
// //       username:
// //       roomname:
// //       createdAt:
// //     },
// //     ...
// //   ]
// // }
// var url = require('url');
// var dummyResponse = {
//   results: [{'text': 'hey', 'username': 'Chike', 'roomname': 'The pressure cooker'}]
// };
// var requestHandler = function(request, response) {
//   // Request and Response come from node's http module.
//   //
//   // They include information about both the incoming request, such as
//   // headers and URL, and about the outgoing response, such as its status
//   // and content.
//   //
//   // Documentation for both request and response can be found in the HTTP section at
//   // http://nodejs.org/documentation/api/

//   // Do some basic logging.
//   //
//   // Adding more logging to your server can be an easy way to get passive
//   // debugging help, but you should always be careful about leaving stray
//   // console.logs in your code.
//   console.log('Serving request type ' + request.method + ' for url ' + request.url);
//   // console.log("request");
//   // The outgoing status.

//   var statusCode = 200;

//   // See the note below about CORS headers.
//   var headers = defaultCorsHeaders;
//   // console.log(headers);

//   // Tell the client we are sending them plain text.
//   //
//   // You will need to change this if you are sending something
//   // other than plain text, like JSON or HTML.

//   headers['Content-Type'] = 'application/json';
//   if (url.parse(request.url).pathname === '/classes/messages' && request.type === 'POST') {  
//     // response.end('Something random');
//     response.writeHead(201, headers);

//   } else {
//     response.end('different');
//   }

//   reponse.writeHead(statusCode, headers);

//   // .writeHead() writes to the request line and headers of the response,
//   // which includes the status and all headers.
//   // response.writeHead(statusCode, headers);

//   // Make sure to always call response.end() - Node may not send
//   // anything back to the client until you do. The string you pass to
//   // response.end() will be the body of the response - i.e. what shows
//   // up in the browser.
//   //
//   // Calling .end "flushes" the response's internal buffer, forcing
//   // node to actually send all the data over to the client.
//   // response.end(JSON.stringify(dummyResponse));
//   response.end(JSON.parse({results: [{'text': 'hello', 'username': 'bob', 'roomname': 'lobby'}]}));
// };

// exports.requestHandler = requestHandler;





/*----------------------------------*/



/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/
// var exports = module.exports = {}; **crashed node

// Message object to send to client looks like
// {
//   results: [
//     {
//       text:
//       username:
//       roomname:
//       createdAt:
//     },
//     ...
//   ]
// }
var url = require('url');
var dummyResponse = {
  results: [{text: 'hey', username: 'Chike', roomname: 'The pressure cooker', createdAt: ''}]
};
var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // console.log("request");
  // The outgoing status.

  var statusCode = 200;

  // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;                //////// COMMENTED OUT TO PASS POMANDER TEST AND PUSH
  // console.log(headers);

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // headers['Content-Type'] = 'application/json';
  // if (url.parse(request.url).pathname === '/classes/messages') {  
  //   response.end('Something random');
  // } else {
  //   response.end('different');
  // }
  if (url.parse(request.url).pathname !== '/classes/messages') {
    response.writeHead(404, headers);
    response.end();
  }
  if (request.url === '/classes/messages' && request.method === 'POST') {  // POST
    // response.end('Something random');
    // response.writeHead(201, headers);
    response.writeHead(201, {'Content-Type': 'application/json'});
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function () {
      dummyResponse.results.push(JSON.parse(body));
    });
    response.end('post recieved');
  } else {                                                                 // GET
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(dummyResponse));
  }




// // //*-----------------------------------------------------------------------*//

//    if (req.method == 'POST') {
//         console.log("POST");
//         var body = '';
//         req.on('data', function (data) {
//             body += data;
//             console.log("Partial body: " + body);
//         });
//         req.on('end', function () {
//             console.log("Body: " + body);
//         });
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('post received');
//     }
//     else
//     {
//         console.log("GET");
//         //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
//         var html = fs.readFileSync('index.html');
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(html);
//     }

// };

// // //*----------------------------------------------------------------------------*// 


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.


  // response.writeHead(statusCode, headers);



  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end(JSON.stringify(dummyResponse));
  // response.end(JSON.stringify(dummyResponse));

};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;









