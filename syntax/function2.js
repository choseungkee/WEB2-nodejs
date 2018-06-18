console.log(Math.round(1.2));
console.log(Math.round(1.7));
/*
Math.round 는 nodejs의 내장함수다. 별도의 선언 없이 사용이 가능하며
console.log(); 없이 사용하면 값이 return 될 뿐 logging을 하지 않는다.
*/

function  sum(first,second){ //parameter
  console.log('A');
  return first+second; // return은 값을 출력한다는 의미와 그 즉시 함수를 종료한다는 키워드
  console.log('B'); // return에서 함수가 종료되어 B는 출력되지 않는다.
}

sum(1,2); // 서버내에서 값이 return 될 뿐 logging을 하지 않는다.
console.log(sum(23,65)); // argument
