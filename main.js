  var http = require('http');
  var fs = require('fs');
  var url = require('url');
  var qs = require('querystring');
  var template = require('./lib/template.js');

  var path = require('path');
  var sanitizeHtml = require('sanitize-html');
  var mysql      = require('mysql');
  var db = mysql.createConnection({
    host     : '192.168.1.214',
    user     : 'root',
    password : 'jj123',
    database : 'opentutorials'
  });
  db.connect();
  var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log(url.parse(_url, true).query.id);
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/'){
    	if (queryData.id === undefined){
/*
          fs.readdir('./data', function(error, filelist){
              var title = "Welcome!";
              var description = "Hello, Node.js!";
              var list = template.List(filelist);
              var body = `<h1>${title}</h1><p>${description}</p>`;
              var control = `<a href="/create">create</a>`
              var HTML = template.HTML(title,list,body,control);
              response.writeHead(200);
              response.end(HTML);
          });
*/
          db.query(`select * from topic`, function(error,topics){
            if(error){
              throw error;
            }
            var title = "Welcome!";
            var description = "Hello, Node.js!";
            var list = template.List(topics);
            var body = `<h1>${title}</h1><p>${description}</p>`;
            var control = `<a href="/create">create</a>`
            var HTML = template.HTML(title,list,body,control);
            response.writeHead(200);
            response.end(HTML);
        });
      } else {

/*
    fs.readdir('./data', function(error, filelist){
          fs.readFile(`./data/${queryData.id}`,'utf8', function(err,description){
              var title = queryData.id;
              var list = template.List(filelist);
              var body = `<h1>${title}</h1><p>${description}</p>`;
              var control = `<a href="/create">create</a>
                             <a href="/update?id=${title}">update</a>
                             <form action="/delete_process" method="POST">
                             <input type="hidden" name = "id" value = "${title}">
                             <input type="submit" value = "delete">
                             </form>`
              var HTML = template.HTML(title,list,body,control);
              response.writeHead(200);
              response.end(HTML);
          });
        });
*/
          db.query(`select * from topic`, function(error,topics){
            if(error){
              throw error;
            }
            db.query(`select * from topic where id = ?`,[queryData.id], function(error2,topic){
              if(error2){
                throw error2;
              }
              //console.log(topics[queryData.id]);
              //console.log(topic);
              var title = topic[0].title;
              var description = topic[0].description;
              var list = template.List(topics);
              var body = `<h1>${title}</h1><p>${description}</p>`;
              var control = `<a href="/create">create</a>
                             <a href="/update?id=${queryData.id}">update</a>
                             <form action="/delete_process" method="POST">
                             <input type="hidden" name = "id" value = "${queryData.id}">
                             <input type="submit" value = "delete">
                             </form>`
              var HTML = template.HTML(title,list,body,control);

              response.writeHead(200);
              response.end(HTML);
            });
        });
      }
    }else if(pathname === '/create'){
/*
          fs.readdir('./data', function(error, filelist){
              var title = "WEB2 - create";
              var list = template.List(filelist);
              var body = `
                  <form action="/create_process" method="POST">
                    <p><input type="text" name = "title" placeholder = "Title"></p>
                    <p><textarea name = "description" placeholder = "Description"></textarea></p>
                    <p><input type ="submit"></p>
                  </form>
              `;
              var HTML = template.HTML(title,list,body,'');
              response.writeHead(200);
              response.end(HTML);
          });
          */
          db.query(`select * from topic`, function(error,topics){
            if(error){
              throw error;
            }
            var title = "Create";
            var list = template.List(topics);
            var body = `
                <form action="/create_process" method="POST">
                  <p><input type="text" name = "title" placeholder = "Title"></p>
                  <p><textarea name = "description" placeholder = "Description"></textarea></p>
                  <p><input type ="submit"></p>
                </form>
                `;
            var control = `<a href="/create">create</a>`
            var HTML = template.HTML(title,list,body,control);
            response.writeHead(200);
            response.end(HTML);
        });
    }else if(pathname === '/create_process'){
              var body = '';
              request.on('data', function(data){
                body += data; //body = body + data;
                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                request.connection.destroy();
              });
              request.on('end',function(){
              var post = qs.parse(body);
              var title = post.title;
              var description = post.description;
/*
              fs.writeFile(`./data/${title}`,description,'UTF-8',function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
              });
*/
              db.query(`INSERT INTO topic (title,description,created,author_id)
                        VALUES (?,?,NOW(),?)`,
                        [post.title,post.description,1],function(error,results){
                          if(error){
                            throw error;
                          }
                          response.writeHead(302, {Location: `/?id=${results.insertId}`});
                          response.end();
              });
            });
   }else if(pathname === `/update`){
      fs.readdir('./data', function(error, filelist){
      fs.readFile(`./data/${queryData.id}`,'utf8', function(err,description){
          var title = queryData.id;
          var list = template.List(filelist);
          var body = `
              <form action="/update_process" method="POST">
                <input type = "hidden" name = "id" value = "${title}">
                <p><input type="text" name = "title" placeholder = "Title" value = "${title}"></p>
                <p><textarea name = "description" placeholder = "Description">${description}</textarea></p>
                <p><input type ="submit"></p>
              </form>
          `;
          var control = `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          var HTML = template.HTML(title,list,body,control);
          response.writeHead(200);
          response.end(HTML);
      });
    });
  } else if(pathname === '/update_process'){
              var body = '';
              request.on('data', function(data){
                body += data; //body = body + data;
                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                request.connection.destroy();
              });
              request.on('end',function(){
              var post = qs.parse(body);
              var id = post.id;
              var title = post.title;
              var description = post.description;
              fs.rename(`./data/${id}`,`./data/${title}`,function(error){
                fs.writeFile(`./data/${title}`,description,'UTF-8',function(err){
                  response.writeHead(302, {Location: `/?id=${title}`});
                  response.end();
                });
                console.log(post);
              });
            });
    }else if(pathname === '/delete_process'){
                var body = '';
                request.on('data', function(data){
                  body += data; //body = body + data;
                  // Too much POST data, kill the connection!
                  // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                  if (body.length > 1e6)
                  request.connection.destroy();
                });
                request.on('end',function(){
                var post = qs.parse(body);
                var id = post.id;
                fs.unlink(`./data/${id}`, function(){
                  console.log(`${id} was deleted`);
                  response.writeHead(302, {Location: '/'});
                  response.end();
                });
              });
      } else {
          response.writeHead(404);
          response.end('File Not Found');
      }


      });
  app.listen(3000);
