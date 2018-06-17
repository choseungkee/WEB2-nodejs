var args = ['a','b','c','d']; //CREATE

console.log(args); //READ
console.log(args.length);
console.log(args[0]);

args[2] = 3; //UPDATE
console.log(args);
console.log(args[2]);

args.push('E'); //UPDATE
args.push('F');
args.push('G');
args.push('H');

console.log(args); //READ
