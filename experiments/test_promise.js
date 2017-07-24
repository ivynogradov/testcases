const jade = require('jade');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));


// fs.readFileAsync('./number.txt')
//     .then((data) => {
//         var d = parseInt(data);
//         var arr = [];
//         for (let i = 1; i < 100; i++){
//             arr.push(d*i);
//         }
//         return arr;
//     })
//     .each((item)=>{
//         console.log("Value is ",item);
//         return fs.writeFileAsync('./dat/'+item+'.dat',item);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

var taskType = {
    DATA_NOT_DEFINED: 1,
    LESS_THEN_LIMIT: 2,
    MORE_THEN_LIMIT: 3
}

function TaskList(){
    this.tasks_list = [];
    return this;
}
TaskList.prototype.addTask = function(type){
    this.tasks_list.push(type);
    return this;
}

var tasks = new TaskList();
tasks
    .addTask(taskType.DATA_NOT_DEFINED)
    .addTask(taskType.LESS_THEN_LIMIT)
    .addTask(taskType.MORE_THEN_LIMIT);

console.log(tasks.tasks_list);

