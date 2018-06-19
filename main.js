  var http = require('http');
  var fs = require('fs');
  var url = require('url');

  function templateHTML (title,list,body){
        return `
        <!doctype html>
        <html>
        <head>
          <title>WEB2 - ${title} </title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${body}
        </body>
        </html>
        `;
  }
  function templateList (filelist){
        var list = '<ol>';
        var i = 0;
        while (i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i+1;
        }
        list = list +'</ol>';
        return list;
  }

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

if (pathname === '/'){
	if (queryData.id === undefined){
      fs.readdir('./data', function(error, filelist){
          var title = "Welcome!";
          var description = "Hello, Node.js!";
          list = templateList(filelist);
          body = `<h1>${title}</h1><p>${description}</p>`;
          var template = templateHTML(title,list,body);
          response.writeHead(200);
          response.end(template);
      });
      } else {
          fs.readdir('./data', function(error, filelist){
              fs.readFile(`./data/${queryData.id}`,'utf8', function(err,description){
              list = templateList(filelist);
              body = `<h1>${title}</h1><p>${description}</p>`;
              var template = templateHTML(title,list,body);
              response.writeHead(200);
              response.end(template);
              });
        });
      }} else {
          response.writeHead(404);
          response.end('Not Found');
      }
      });
  app.listen(3000);
