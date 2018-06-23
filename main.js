  var http = require('http');
  var fs = require('fs');
  var url = require('url');
  var qs = require('querystring');

  function templateHTML (title,list,body){
        return `
        <!doctype html>
        <html>
        <head>
          <title>WEB - ${title} </title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB2</a></h1>
          ${list}
          <a href="/create">create</a>
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
    if (pathname === '/'){
    	if (queryData.id === undefined){
          fs.readdir('./data', function(error, filelist){
              var title = "Welcome!";
              var description = "Hello, Node.js!";
              var list = templateList(filelist);
              var body = `<h1>${title}</h1><p>${description}</p>`;
              var template = templateHTML(title,list,body);
              response.writeHead(200);
              response.end(template);
          });
      } else {
          fs.readdir('./data', function(error, filelist){
          fs.readFile(`./data/${queryData.id}`,'utf8', function(err,description){
              var title = queryData.id;
              var list = templateList(filelist);
              var body = `<h1>${title}</h1><p>${description}</p>`;
              var template = templateHTML(title,list,body);
              response.writeHead(200);
              response.end(template);
          });
        });
      }
    }else if(pathname === '/create'){
          fs.readdir('./data', function(error, filelist){
              var title = "WEB2 - create";
              var list = templateList(filelist);
              var form = `
                  <form action="http://192.168.1.214:3000/create_process" method="POST">
                    <p><input type="text" name = "title" placeholder = "title"></p>
                    <p><textarea name = "description" placeholder = "description"></textarea></p>
                    <p><input type ="submit"></p>
                  </form>
              `;
              var body = form;
              var template = templateHTML(title,list,body);
              response.writeHead(200);
              response.end(template);
          });
    }else if(pathname === '/create_process'){
              var body = '';
              request.on('data', function(data){
                body += data; //body = body + data;
              });
              request.on('end',function(){
                var post = qs.parse(body);
                var title = post.title;
                var description = post.description;
              });
              response.writeHead(200);
              response.end('success');
    }else {
          response.writeHead(404);
          response.end('Not Found');
      }


      });
  app.listen(3000);
