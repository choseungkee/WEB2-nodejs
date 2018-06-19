var fs = require('fs');
/*
//readFileSync
console.log('A');
var result = fs.readFileSync('./sample.txt','utf-8');
console.log(result);
console.log('C');
*/
console.log('A');
fs.readFile('./sample.txt','utf-8',function(err,result){
  //function(err,result)의 함수는 만약 에러가 있으면 첫번째 인자 err에 담아 출력하고
  // 값이 있다면 파일의 내용을 result 인자로서 공급해주는 역할을 한다.
  console.log(result);
});
console.log('C');
