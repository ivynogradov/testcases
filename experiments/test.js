var moment = require('moment');
moment.locale('ua');

// console.log(moment('2017-05-03T22:00:00.000Z'));
// var sec = moment().seconds('2017-05-03T22:00:00.000Z');
// console.log(m().moment());
// var a = moment('2017-05-03T00:00:00.000Z');
// var b = moment('2017-05-08T00:00:00.000Z');
// var d = a.diff(b, 'days');
// console.log(d);
// var MAX = 0;
// var d = moment('2017-05-03T00:00:00.000Z').diff(moment('2017-05-03T00:00:00.000Z'), 'days');
// console.log(d * MAX);
// console.log((900 / 1000).toFixed(2));

const durationInDays = (startTime, endTime) => {
    try{
        var duration = moment(endTime).diff(moment(startTime), 'days');
        return duration < 1 || duration == NaN ? 1 : duration;
    } catch (err) {
        return 1;
    }

} 
Challenge = {
    MIN_DISTANCE: 1000,
    MIN_DURATION: 60,
    MIN_COUNT: 1,
    MAX_COUNT: 100
}
Activity = {
    MAX_DISTANCE: 1000000,
    MAX_DURATION: 86400
}

const isValidTargetValue = (value, measure, durationInDays) => {
    switch (measure) {
        case 'distance':
            return (value < Challenge.MIN_DISTANCE || value > (Activity.MAX_DISTANCE * durationInDays)) ? false : true;
            break;
        case 'duration':
            return (value < Challenge.MIN_DURATION || value > (Activity.MAX_DURATION * durationInDays)) ? false : true;
            break;
        case 'count':
            return (value < Challenge.MIN_COUNT || value > (Challenge.MAX_COUNT * durationInDays)) ? false : true;
            break;
        default:
            return false;
    }
}

console.log(isValidTargetValue(3000000,'distance', durationInDays('2017-05-03T00:00:00.000Z', '2017-05-06T00:00:00.000Z')));
// console.log(durationInDays('2017-05-0qwT00:00:00.000Z', '2017-05-06T00:00:00.000Z'));
console.log(durationInDays('2017-05-03', '2017-05-06'));