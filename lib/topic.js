
var template = require('./template.js');
var db = require('./db.js');
var url = require('url');
var qs = require('querystring');

exports.home = function (request,response){
  db.query(`SELECT * FROM topic`, function(err,topics){
    if(err){
      throw err;
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
}

exports.page = function (request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function(err,topics){
    if(err){
      throw err;
    }
    db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id = ?`,[queryData.id], function(err2,topic){
      if(err2){
        throw err2;
      }
      var title = topic[0].title;
//              console.log(topic[0]);
      var description = topic[0].description;
      var list = template.List(topics);
      var body = `<h1>${title}</h1>${description}<p>by ${topic[0].name} </p>`;
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

exports.create = function (request,response){
  db.query(`SELECT * FROM topic`, function(err,topics){
    if(err){
      throw err;
    }
    db.query(`SELECT * FROM author`, function(err2,authors){
      if(err2){
        throw err;
      }
      var title = "Create";
      var list = template.List(topics);
      var body = `
          <form action="/create_process" method="POST">
            <p><input type="text" name = "title" placeholder = "Title"></p>
            <p><textarea name = "description" placeholder = "Description"></textarea></p>
            <p>${template.selectAuthor(authors)}</p>
            <p><input type ="submit"></p>
          </form>
          `;
      var control = `<a href="/create">create</a>`
      var HTML = template.HTML(title,list,body,control);
      response.writeHead(200);
      response.end(HTML);
    });
});
}

exports.create_process = function(request,response){
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
  db.query(`INSERT INTO topic (title,description,created,author_id) VALUES (?, ?, NOW(), ?)`,[post.title,post.description,post.author],function(err,results){
            if(err){
              throw err;
            }
            response.writeHead(302, {Location: `/?id=${results.insertId}`});
            response.end();
  });
});
}

exports.update = function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function(err,topics){
    if(err){
      throw err;
    }
   db.query(`SELECT * FROM topic WHERE id = ?`,[queryData.id], function(err2,topic){
     if(err2){
       throw err2;
     }
     db.query(`SELECT * FROM author`, function(err3,authors){
       if(err3){
         throw err;
       }
       var list = template.List(topic);
       var body = `
           <form action="/update_process" method="POST">
             <input type = "hidden" name = "id" value = "${topic[0].id}">
             <p><input type="text" name = "title" placeholder = "Title" value = "${topic[0].title}"></p>
             <p><textarea name = "description" placeholder = "Description">${topic[0].description}</textarea></p>
             <p>${template.selectAuthor(authors, topic[0].author_id)}</p>
             <p><input type ="submit"></p>
           </form>
       `;
       var control = `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
       var HTML = template.HTML(topic[0].title,list,body,control);
       response.writeHead(200);
       response.end(HTML);
     });
 });
});
}

exports.update_process = function(request,response){
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
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id =?`,[post.title, post.description, post.author, post.id], function(err,results){
              if (err){
                throw err;
              }
              response.writeHead(302, {Location: `/?id=${post.id}`});
              response.end();
            });
});
}

exports.delete_process = function(request,response){
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
  db.query(`DELETE FROM topic WHERE id =?`,[post.id],function(err,result){
    if(err){
      throw err;
    }
    console.log(`${post.id} was deleted`);
    response.writeHead(302, {Location: '/'});
    response.end();
  });
});
}
