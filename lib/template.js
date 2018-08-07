module.exports = {
  HTML:function(title,list,body,control){
        return `
        <!doctype html>
        <html>
        <head>
          <title>WEB2 - ${title} </title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB2</a></h1>
          ${list}
          ${control}
          ${body}
        </body>
        </html>
        `;
  },
  List:function (topics){
        var list = '<ul>';
        var i = 0;
        while (i < topics.length) {
          list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
          i = i+1;
        }
        list = list +'</ul>';
        return list;
  },selectAuthor:function(authors){
        var tag ='';
        var i = 0;
/*
          var selected = '';
          if(authors[i].id === author.id ){
              selected = ' selected';
          }
*/
        while(i < authors.length){
          tag += `
          <option value="${authors[i].id}">${authors[i].name}</option>
          `;
          i++;
        };
        return `
          <select name = "author" >
            ${tag}
          </select>
        `;
  }
}
