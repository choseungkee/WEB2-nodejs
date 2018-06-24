/*
function sum(a,b){
  console.log(a+b);
};

sum(234,23411);
*/

//var i = for(true){console.log(1);} // for statement는 value가 될 수 없다
//var w = while (true) {console.log(1);} // while statement는 value가 될 수 없다

var f = function(){console.log('k8805');} //function statemenet는 value가 될 수 있다.
console.log(f);
f();

var a = [f]; // 배열의 원소로서 함수가 되거나
console.log(a[0]);
a[0]();

var o = {func:f} // 함수의 원소로서 함수가 될 수 있다.
console.log(o.func);
o.func();
