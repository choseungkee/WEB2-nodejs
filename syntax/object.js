var members = ['egoing', 'k8805', 'choseungkee'];
//console.log(members[1]);

var i = 0;
while (i < members.length) {
  console.log('arrayLoop =>', members[i]);
  i = i + 1;
}
console.log('');
var roles = {
  projectManager:'choseungkee',
  projectLeader:'k8805',
  projectMember:'Tmaxsoft'
};

/*
console.log('projectManager : '+ role.projectManager);
console.log('projectLeader : ' + role.projectLeader);
console.log('projectMember : ' + role.projectMemver);
*/

//console.log(roles.projectManager);
console.log(roles['projectManager']);

for (var n in roles) {
  console.log('object =>',n,'value =>',roles[n]);
}
