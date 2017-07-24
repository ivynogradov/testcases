const jade = require('jade');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

// hardcoded constants
const CHALLENGE_FRIENDS_LB_SHOW_LIMIT = 10;
const CHALLENGE_FRIENDS_LB_OVER_LIMIT_VISIBLE = 5;



var generateUserInfo = () => {
    const NAMES = ['Ievgen', 'Pavlo', 'Ostap', 'Ihor', 'Alex', 'Roman', 'Volodymyr', 'Dmytro', 'Yura'];
    const LASTNAMES = ['Grushevsky', 'Khmelnutsky', 'Polubotko', 'Mazepa', 'Bulba', 'Sagaydachny'];
    const COLORS = ['black', 'blue', 'magenta', 'red', 'green', 'yellow', 'orange'];
    var result = {};

    result.user = {};
    result.user.color = {};
    result.score = {};
    result.score.percentages = {};

    let fname = NAMES[Math.round(Math.random() * NAMES.length)];
    let lname = LASTNAMES[Math.round(Math.random() * LASTNAMES.length)];

    result.user.name = fname + ' ' + lname;
    result.user.initials = fname[0] + lname[0];
    result.user.color.bg = COLORS[Math.round(Math.random() * COLORS.length)];
    result.user.color.fg = 'white';
    result.score.percentages.current = Math.round(Math.random() * 100);
    result.score.percentages.rest = 100 - result.score.percentages.current;
    result.completed = (result.score.percentages.current === 100) ? true : false;

    return result;
}

var i18n = function (str){
    switch (str) {
        case 'MAIL_CHALLENGE_SUMMARY_FRIENDS_DID_TEXT':
            return 'This is how your friends did';   
        case 'MAIL_CHALLENGE_SUMMARY_OTHERS_LABEL':
            return 'others';
        case 'MAIL_CHALLENGE_SUMMARY_COMPLETED_LABEL':
            return 'completed';
    }
}

var html_options = {
    encoding: 'utf8'
}

var market = 'no';
var sails = {
    config : {
        markets : {
            'no' : {
            spaceid: "gqh9btxac9h8",
            domain: 'https://www.sprekere.no',
            mailSender: 'noreply@sprekere.no',
            mailSenderName: 'sprekere.no',
            brand: {
                id: 'sprekere',
                name: 'Sprekere',
                proName: 'Sprekere Pro',
                siName: 'Sprekere Indeks',
                siOrgName: 'Sprekere Bedrift-Indeks',
                domain: 'sprekere.no',
                supportEmail: 'support@sprekere.no',
                supportUrl: 'https://sprekere.no/support',
                contactUrl: 'https://sprekere.no/kontakt',
                facebookUrl: 'https://www.facebook.com/sprekere.no',
                proIcon: 'https://d2o232k0iray4q.cloudfront.net/media/sprekere-pro-icon/sprekere-pro-icon.png',
                logo: 'https://d2o232k0iray4q.cloudfront.net/media/sprekere-logo/sprekere-logo.svg',
                proLogo: 'https://d2o232k0iray4q.cloudfront.net/media/sprekere-pro-logo/sprekere-pro-logo.svg',
            },
            features: {
                trips: true
            },
            defaultLocale: 'nb',
            locales: ['nb','en'],
            publiclocales: ['nb','en'],
            mailchimp: {
                key: 'ba5d8aaff11cc7208e24911b92bb11ba-us8',
                list: '50645e9b76',
                autoSync: false
            },
            mandrill: {
                key: 'v5e8e0Ni1AO4JT_IRX_9hw',
                logoUrl: 'http://gallery.mailchimp.com/bf9e9290657ac8ad6569bf775/images/94b62979-9111-467b-868b-c3a22fd926de.png',
                logoWhiteUrl: 'https://gallery.mailchimp.com/bf9e9290657ac8ad6569bf775/images/31bdff5d-e6d7-4e76-86a5-83c74feaf5f3.png'
            },
            endomondo: {
                consumerKey: '279108db65a7cd505c9867fcddbab067',
                consumerSecret: '1d617a6f2baada731f8e0c03063e57d7'
            },
            runKeeper: {
                client_id: 'a91f15660fee45d1a8143180283f7831',              // "BT Sprek"-app
                client_secret: '63816e9691214b3aa883cfd745862ef6'
            },
            strava: {
                client_id: '2937',              // "BT Sprek"-app
                client_secret: 'ced4d160908ad7f25b83613f1ee5a7b37cb46fd8',
            },
            intercom: {
                appId: 'bh4nzv9y',//dev/stage key, override in local.js in prod
                hmacKey: 'HfkxvFWMzRtfczbPhmqOV8_SsLBSPmNkySb8Q_Lz',
                accessToken: 'dG9rOjE4MzVlMzhhXzQyNjRfNDEwZF9hZDJmXzI4OTMxYWZhODA3MDoxOjA='
            }
            }
        }
    }
}

var user = {
    progress : 'You have done 67%',
    percentages : {
        current : '67',
        rest : '33'
    }
}

var users_data = [
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Michaylo Prever',
            initials : 'YV',
            color : {
                bg : 'green',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '100',
                rest : '0',
            }
        },
        completed : true
    },   
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },    
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    },
    {
        user : {
            name : 'Yevhen Vynohradov',
            initials : 'YV',
            color : {
                bg : 'red',
                fg : 'white'
            }
        },
        score : {
            percentages : {
                current : '67',
                rest : '33',
            }
        }
    }
];

const count = users_data.length;
const complited = _.reduce(users_data, (sum, n) => {
    if (n.complited === true) return sum + 1;
    else return sum;
}, 0);

var lbData = {
    data : users_data,
    participants : {
        complited : complited,
        count : count
    },
    limit : CHALLENGE_FRIENDS_LB_SHOW_LIMIT
}

if (count > CHALLENGE_FRIENDS_LB_SHOW_LIMIT) {
    lbData.participants.visible = CHALLENGE_FRIENDS_LB_OVER_LIMIT_VISIBLE;
    lbData.participants.filtered = count - CHALLENGE_FRIENDS_LB_OVER_LIMIT_VISIBLE;
}

var jade_options = {
    pretty : true,
    sails : sails,
    i18n : i18n,
    market : market,
    header : 'MyChallenge is completed',
    footer : 'Hope you enjoyed the challenge and will give it another go! Best regard team-{brandName}',
    graph : '',
    user : user,
    lbData : lbData
}

var taskType = {
    DATA_NOT_DEFINED: 1,
    LESS_THEN_LIMIT: 2,
    MORE_THEN_LIMIT: 3
}

function TestCase(){
    this.template = {};
    this.template.name = '';
    this.template.data = null;
    this.taskList = [];
    this.model = {};
    this.pages = [];
    return this;
}

TestCase.prototype.generateDataModel = function(){
    if (this.taskList.length > 0) {
        for (let i = 0; i < this.taskList.length; i++){
            switch (this.taskList[i]) {
                case taskType.DATA_NOT_DEFINED:
                    this.model[taskType.DATA_NOT_DEFINED] = undefined;
                    break;
                case taskType.LESS_THEN_LIMIT:

                    break;
                case taskType.MORE_THEN_LIMIT:

                    break;
            }
        }
    }
}

TestCase.prototype.setTestingTemplate = function(filename){
    this.template.name = filename;
    return this;
}

TestCase.prototype.setTestingTemplateData = function(data){
    this.template.data = data;
    return this;
}

TestCase.prototype.addTask = function(type){
    this.taskList.push(type);
    return this;
}

TestCase.prototype.getTaskList = function(){
    return this.taskList;
}

TestCase.prototype.getTemplateFileName = function(){
    return this.template.name;
}

TestCase.prototype.getPages = function(){
    return this.pages;
}

var generateDataForTasks = (jade_template, tasks) => {
    tasks.setTestingTemplateData(jade_template);
    tasks.generateDataModel();
    return tasks.getTaskList();
}
var generateEmailsTemplate = (item, index, length, tasks) => {

}

console.log('--------- START ----------');

let tasks = new TestCase();
tasks
    .setTestingTemplate('./template/summary.jade')
    .addTask(taskType.DATA_NOT_DEFINED)
    .addTask(taskType.LESS_THEN_LIMIT)
    .addTask(taskType.MORE_THEN_LIMIT);

fs.readFileAsync(tasks.getTemplateFileName())
    .then(generateDataForTasks(jade_template, tasks))
    .each(generateEmailsTemplate(item, index, length))
    .each([], (fileData) => jade.renderFile(fileData, jade_options))
    .then((outputFilesData) => {})
fs.writeFileSync('output.html', html, html_options);


console.log('--------- END ----------');

// console.log(generateUserInfo());