const jade = require('jade');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

let tasks = new require('./libs/testcases').TestCase(67);


var generateDataForTasks = (jade_template, tasks) => {
    tasks
        .setTestingTemplate(jade_template)
        .generateDataModel();
    return tasks.getTaskList();
}
var generateEmailsTemplate = (item, index, length, tasks) => {
    tasks.setPages(item, jade.renderFile(tasks.getTemplateData(), tasks.getJadeOptions(item)));
    return tasks.getPages();
}
var saveCompiledTemplate = (item, index, length, tasks) => {
    fs.writeFileAsync('output'+ item.type +'.html', item.data, tasks.getHTMLOptions())
        .catch((error) => {
            console.log(error);
        });

}

console.log('--------- START ----------');

tasks
    .setTestingTemplate('./template/summary.jade')
    .addTask(taskType.DATA_NOT_DEFINED)
    .addTask(taskType.LESS_THEN_LIMIT)
    .addTask(taskType.MORE_THEN_LIMIT);

fs.readFileAsync(tasks.getTemplateFileName())
    .then(generateDataForTasks(jade_template, tasks))
    .each(generateEmailsTemplate(item, index, length, tasks))
    .each(saveCompiledTemplate(item, index, length, tasks))
    .catch((error) => {
        console.log(error);
    })


console.log('--------- END ----------');

// console.log(generateUserInfo());