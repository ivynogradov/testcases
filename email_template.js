'use strict';
const jade = require('jade');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
var TestCase = require('./libs/testcases')
var tasks = new TestCase(67);


var generateDataForTasks = () => {
    tasks
        .generateDataModel();
    return tasks.getTaskList();
}
var generateEmailsTemplate = (item, index, length) => {
    tasks.setPages(item, jade.render(tasks.getTemplateData(), tasks.getJadeOptions(item)));
    return tasks.getPage(item);
}
var saveCompiledTemplate = (item, index, length) => {
    fs.writeFileAsync('output'+ item.type +'.html', item.data, tasks.getHTMLOptions())
        .catch((error) => {
            console.log(error);
        });

}

console.log('--------- START ----------');

tasks
    .setTestingTemplate('./template/summary.jade')
    .addTask(tasks.TYPE.DATA_NOT_DEFINED)
    .addTask(tasks.TYPE.LESS_THEN_LIMIT)
    .addTask(tasks.TYPE.MORE_THEN_LIMIT);

fs.readFileAsync(tasks.getTemplateFileName())
    .then(generateDataForTasks)
    .each(generateEmailsTemplate)
    .then(() => {return tasks.getPages()})
    .each(saveCompiledTemplate)
    .catch((error) => {
        console.log(error);
    })


console.log('--------- END ----------');

// console.log(generateUserInfo());