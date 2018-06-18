    var http = require('http');
    var fs = require('fs');
    var url = require('url');

    var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    //console.log(queryData);
    var pathname = url.parse(_url, true).pathname;
    //console.log(url.parse(_url, true));
    var title = queryData.id;
    //console.log(queryData.id);


	if (pathname === '/'){
	if (queryData.id === undefined){
      fs.readdir('./data', function(error, filelist){
          //console.log(filelist);
          var title = "Welcome!";
          var description = "Hello, Node.js !";
          var list = '<ol>';
          var i = 0;
          while (i < filelist.length) {
            //list = list + `<li>${filelist[i]}</li>`;
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i+1;
          }
          list = list +'</ol>';

          /*
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          */
          var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB2 - ${title} </title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
              </body>
              </html>
              `;
      response.writeHead(200);
      response.end(template);
      });

} else {
    fs.readdir('./data', function(error, filelist){
        var list = '<ol>';
        var i = 0;
        while (i < filelist.length) {
          //list = list + `<li>${filelist[i]}</li>`;
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i+1;
        }
        list = list +'</ol>';
        fs.readFile(`./data/${queryData.id}`,'utf8', function(err,description){
        //var description = data;
        var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB2 - ${title} </title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
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
