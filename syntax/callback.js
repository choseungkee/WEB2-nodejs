/*
function a(){
  console.log('A');
}
a();

var a = function(){
  console.log('A');
}

a();
*/


var a = function(){
  console.log('A');
}

a(); // 변수 뒤에 함수기호를 붙여서 변수안의 함수를 호출 할 수 있다.

function slowfunc(callback){
  console.log(1);
  console.log(2);
  console.log(3);
  callback();
}

var b = function(){
  console.log('test');
}

slowfunc(a);
slowfunc(b);
