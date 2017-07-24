'use strict';
const jade = require('jade');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
var TestCase = require('./libs/testcases')
var tasks = new TestCase(67);


var generateDataForTasks = (data) => {
    //console.log(data.toString('utf8'));
    return tasks.generateDataModel().getTaskList();
}
var generateEmailsTemplate = (item, index, length) => {
    console.log(tasks.getTemplateFileName());
    tasks.setPages(item, jade.renderFile(tasks.getTemplateFileName(), tasks.getJadeOptions(item)));
    fs.writeFileAsync('output'+ item.type +'.html', item.data, tasks.getHTMLOptions())
        .catch((error) => {
            console.log('Error!!!!');
        });
}
// var saveCompiledTemplate = (item, index, length) => {
//     fs.writeFileAsync('output'+ item.type +'.html', item.data, tasks.getHTMLOptions())
//         .catch((error) => {
//             console.log(error);
//         });

// }


tasks
    .setTestingTemplate('./template/summary.jade')
    .addTask(tasks.TYPE.DATA_NOT_DEFINED)
    .addTask(tasks.TYPE.LESS_THEN_LIMIT)
    .addTask(tasks.TYPE.MORE_THEN_LIMIT);

fs.readFileAsync(tasks.getTemplateFileName())
    .then(generateDataForTasks)
    .each(generateEmailsTemplate)
    // .then(saveCompiledTemplate)
    .catch((error) => {
        console.log(error);
    })
