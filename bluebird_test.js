var 
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

function readTemplate(filename){
    return new Promise(function(resolve, reject){
        try{
            resolve (fs.readFileAsync('text1.txt'));
        } catch(err){
            reject(err);
        }
    });
}

readTemplate()