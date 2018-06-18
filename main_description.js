    var http = require('http');
    var fs = require('fs');
    var url = require('url');
    //require로 선언하여 import 시키는 기능으로 보임

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

function listFarm (filelist){
      var list = '<ol>'; //fs.readdir 함수를 사용하여 filelist를 배열에 담고 ./data에 있는 파일을 filelist로 출력
      var i = 0;
      while (i < filelist.length) {
        //list = list + `<li>${filelist[i]}</li>`;
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        /* queryData.id에 ${filelist[i]}를 출력하여 fs.readFile 함수를 호출하여
        데이터 본문${description}을 출력 하는 로직을 수행한다.*/
        i = i+1;
      }
      list = list +'</ol>';
      return list;

      /*
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      */
}

var app = http.createServer(function(request,response){ //서버를 생성하고 http 요청과 응답을 buffer에 담는 함수
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    //console.log(queryData);
    var pathname = url.parse(_url, true).pathname;
    //console.log(url.parse(_url, true)); 요청에 대한 url 정보를 확인 할 수 있다.
    var title = queryData.id;
    //console.log(queryData.id);

	if (pathname === '/'){       //pathname = '/'로 들어온 경우
	if (queryData.id === undefined){       // QueryString = 명시되지 않은 경우
      fs.readdir('./data', function(error, filelist){
          //console.log(filelist);
          var title = "Welcome!";
          var description = "Hello, Node.js !";  //${title}, ${description} 변수를 선언하여 Welcome Message 를 던진다
          list = listFarm(filelist);
          body = `<h1>${title}</h1><p>${description}</p>`;
          var template = templateHTML(title,list,body);
          response.writeHead(200);
          response.end(template);
      });

} else {
    fs.readdir('./data', function(error, filelist){
        fs.readFile(`./data/${queryData.id}`,'utf8', function(err,description){
        //var description = data;
        list = listFarm(filelist);
        body = `<h1>${title}</h1><p>${description}</p>`;
        var template = templateHTML(title,list,body);
        response.writeHead(200); // http reponse code 200을 던진다.
        response.end(template); //request에 대한 url 정보를 parse 하여 template변수에 담아 response 한다.
        });
  });
}} else {
    response.writeHead(404); // http Error Code 404 Not Found
    response.end('Not Found'); // request에 대한 응답으로  error page로 응답한다.
}
});
app.listen(3000); //http server 에 대한 Listen Port
