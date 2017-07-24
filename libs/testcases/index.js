"use strict";

const _ = require('lodash');

function TestCase(currentProgress){
    this.TYPE = {
        DATA_NOT_DEFINED: 1,
        LESS_THEN_LIMIT: 2,
        MORE_THEN_LIMIT: 3
    }
    this.NAMES = ['Ievgen', 'Pavlo', 'Ostap', 'Ihor', 'Alex', 'Roman', 'Volodymyr', 'Dmytro', 'Yura'];
    this.LASTNAMES = ['Grushevsky', 'Khmelnutsky', 'Polubotko', 'Mazepa', 'Bulba', 'Sagaydachny'];
    this.COLORS = ['black', 'blue', 'magenta', 'red', 'green', 'yellow', 'orange'];
    this.CHALLENGE_FRIENDS_LB_SHOW_LIMIT = 10;
    this.CHALLENGE_FRIENDS_LB_OVER_LIMIT_VISIBLE = 5;
    // Init block
    this.template = {
        name: null,
        data: null
    };
    this.taskList = [];
    this.model = {};
    this.pages = [];
    this.options = {
        output : {
            encoding: 'utf8'            
        },
        market: 'no',
        sails:  {
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

    }    
    
    this.model.user = {
        progress : 'You have done ' + this.model.user.percentages.current + '%',
        percentages : {
            current : currentProgress,
            rest : 100 - this.model.user.percentages.current
        }      
    };
    this.model.tasks = {};
    return this;
}

TestCase.prototype.generateDataModel = function(){
    var self = this;
    var generateUserInfo = () => {
        var result = {};
        result.user = {};
        result.user.color = {};
        result.score = {};
        result.score.percentages = {};

        let fname = self.NAMES[Math.round(Math.random() * self.NAMES.length)];
        let lname = self.LASTNAMES[Math.round(Math.random() * self.LASTNAMES.length)];

        result.user.name = fname + ' ' + lname;
        result.user.initials = fname[0] + lname[0];
        result.user.color.bg = self.COLORS[Math.round(Math.random() * self.COLORS.length)];
        result.user.color.fg = 'white';
        result.score.percentages.current = Math.round(Math.random() * 100);
        result.score.percentages.rest = 100 - result.score.percentages.current;
        result.completed = (result.score.percentages.current === 100) ? true : false;

        return result;
    }

    if (this.taskList.length > 0) {
        for (let i = 0; i < this.taskList.length; i++){
            switch (this.taskList[i]) {
                case this.TYPE.DATA_NOT_DEFINED:
                    this.model.tasks[this.TYPE.DATA_NOT_DEFINED].jade = {
                        pretty : true,
                        sails : this.options.sails,
                        i18n : this.i18n,
                        market : this.options.market,
                        header : 'MyChallenge is completed',
                        footer : 'Hope you enjoyed the challenge and will give it another go! Best regard team-SPREKERE',
                        graph : '',
                        user : this.model.user,
                        users : {
                            data : undefined,
                            participants : {},
                            limit : this.CHALLENGE_FRIENDS_LB_SHOW_LIMIT
                        }
                    }

                    break;
                case this.Type.LESS_THEN_LIMIT:
                    this.model.tasks[this.TYPE.LESS_THEN_LIMIT].jade = {
                        pretty : true,
                        sails : this.options.sails,
                        i18n : this.i18n,
                        market : this.options.market,
                        header : 'MyChallenge is completed',
                        footer : 'Hope you enjoyed the challenge and will give it another go! Best regard team-SPREKERE',
                        graph : '',
                        user : this.model.user,
                        users : {
                            data : [],
                            participants : {},
                            limit : this.CHALLENGE_FRIENDS_LB_SHOW_LIMIT
                        }
                    }
                    for (let i = 0; i < 5; i++){
                        this.model.tasks[this.TYPE.LESS_THEN_LIMIT].jade.users.data.push(generateUserInfo());
                    }
                    break;
                case this.Type.MORE_THEN_LIMIT:
                    this.model.tasks[this.TYPE.MORE_THEN_LIMIT].jade = {
                        pretty : true,
                        sails : this.options.sails,
                        i18n : this.i18n,
                        market : this.options.market,
                        header : 'MyChallenge is completed',
                        footer : 'Hope you enjoyed the challenge and will give it another go! Best regard team-SPREKERE',
                        graph : '',
                        user : this.model.user,
                        users : {
                            data : [],
                            participants : {},
                            limit : this.CHALLENGE_FRIENDS_LB_SHOW_LIMIT
                        }
                    }
                    for (let i = 0; i < 10; i++){
                        this.model.tasks[this.TYPE.MORE_THEN_LIMIT].jade.users.data.push(generateUserInfo());
                    }
                    break;
            }
        }
        const cnt = this.model.users.length;
        const complited = _.reduce(this.model.users, (sum, n) => {
            if (n.complited === true) return sum + 1;
            else return sum;
        }, 0); 
        this.model.jade.users.participants.completed = complited;
        this.model.jade.users.participants.count = cnt;

        if (cnt > this.CHALLENGE_FRIENDS_LB_SHOW_LIMIT) {
            this.model.jade.users.participants.visible = this.CHALLENGE_FRIENDS_LB_OVER_LIMIT_VISIBLE;
            this.model.jade.users.participants.filtered = cnt - this.CHALLENGE_FRIENDS_LB_OVER_LIMIT_VISIBLE;
        }
    }
    return this;
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

TestCase.prototype.getTemplateData = function(){
    return this.template.data;
}

TestCase.prototype.getPages = function(){
    return this.pages;
}

TestCase.prototype.setPages = function(taskType, data){
    this.pages.push({
        type: taskType,
        data: data
    });
}

TestCase.prototype.getJadeOptions = function(taskType){
    return this.model.tasks[taskType].jade;
}

TestCase.prototype.getHTMLOptions = function(){
    return this.options.output;
}

TestCase.prototype.i18n = function(str){
    switch (str) {
        case 'MAIL_CHALLENGE_SUMMARY_FRIENDS_DID_TEXT':
            return 'This is how your friends did';   
        case 'MAIL_CHALLENGE_SUMMARY_OTHERS_LABEL':
            return 'others';
        case 'MAIL_CHALLENGE_SUMMARY_COMPLETED_LABEL':
            return 'completed';
    }    
}

module.exports.TestCase = TestCase;