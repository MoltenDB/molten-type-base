"use strict";
var zeroPad = function (value) { return "" + (value < 10 ? '0' : '') + value; };
function DateOnly(date) {
    if (typeof date === 'undefined') {
        date = new Date();
    }
    else if (date instanceof DateOnly) {
        date = new Date(date.toString());
    }
    else if (typeof date === 'number') {
        var dateObject = new Date();
        dateObject.setFullYear(Math.round(date / 10000));
        dateObject.setMonth(Math.round((date % 10000) / 100));
        dateObject.setDate(date % 100);
        date = dateObject;
    }
    else {
        date = new Date(date);
    }
    Object.defineProperty(this, 'date', {
        value: date,
        enumerable: false
    });
}
exports.DateOnly = DateOnly;
DateOnly.prototype = {
    toString: function () { return this.date.getFullYear() + "-" + zeroPad(this.date.getMonth() + 1) + "-" + zeroPad(this.date.getDate()); },
    valueOf: function () { return this.date.getFullYear() * 10000 + (this.date.getMonth() + 1) * 100 + this.date.getDate(); },
    getDate: function () { return this.date.getDate(); },
    getDay: function () { return this.date.getDay(); },
    getFullYear: function () { return this.date.getFullYear(); },
    getMonth: function () { return this.date.getMonth(); },
    getUTCDate: function () { return this.date.getUTCDate(); },
    getUTCDay: function () { return this.date.getUTCDay(); },
    getUTCFullYear: function () { return this.date.getUTCFullYear(); },
    getUTCMonth: function () { return this.date.getUTCMonth(); },
    getYear: function () { return this.date.getYear(); },
    setDate: function () { return this.date.setDate(); },
    setFullYear: function () { return this.date.setFullYear(); },
    setHours: function () { return this.date.setHours(); },
    setMonth: function () { return this.date.setMonth(); },
    setUTCDate: function () { return this.date.setUTCDate(); },
    setUTCFullYear: function () { return this.date.setUTCFullYear(); },
    setUTCMinutes: function () { return this.date.setUTCMinutes(); },
    setUTCMonth: function () { return this.date.setUTCMonth(); },
    setYear: function () { return this.date.setYear(); },
    toDateString: function () { return this.date.toDateString(); },
    toGMTString: function () { return this.date.toGMTString(); },
    toISOString: function () { return this.date.getFullYear() + "-" + zeroPad(this.date.getMonth() + 1) + "-" + zeroPad(this.date.getDate()); },
    toJSON: function () { return this.date.getFullYear() + "-" + zeroPad(this.date.getMonth() + 1) + "-" + zeroPad(this.date.getDate()); },
    toLocaleDateString: function () { return this.date.toLocaleDateString(); },
    toUTCString: function () { return this.date.toUTCString(); }
};
var timePrecision = function (precision) {
    if (typeof precision === 'number') {
        return precision;
    }
    else {
        switch (precision) {
            case 'seconds':
                return 1;
            case 'hours':
                return 3600;
            case 'minutes':
            default:
                return 60;
        }
    }
};
function TimeOnly(time, precision) {
    if (typeof time === 'undefined') {
        time = new Date();
    }
    else if (typeof time === 'number') {
        var date = new Date();
        precision = timePrecision(precision);
        if (precision < 60) {
            date.setHours(Math.round(time / 10000));
            date.setMinutes(Math.round((time % 10000) / 100));
            date.setSeconds(time % 100);
        }
        else if (precision >= 60 && precision < 3600) {
            date.setHours(Math.round(time / 100));
            date.setMinutes(time % 100);
        }
        else {
            date.setHours(time);
        }
        time = date;
    }
    else if (time instanceof TimeOnly) {
        time = new Date(time.toString());
    }
    else {
        time = new Date(time);
    }
    Object.defineProperty(this, 'time', {
        value: time,
        enumerable: false
    });
}
exports.TimeOnly = TimeOnly;
TimeOnly.prototype = {
    toString: function () { return zeroPad(this.time.getHours()) + ":" + zeroPad(this.time.getMinutes()); },
    valueOf: function (precision) {
        if (typeof precision === 'string' && precision.match(/seconds$/)
            || typeof precision === 'number' && precision < 60) {
            return this.time.getHours() * 10000 + this.time.getMinutes() * 100 + this.time.getSeconds();
        }
        else {
            return this.time.getHours() * 100 + this.time.getMinutes();
        }
    },
    getHours: function () { return this.time.getHours(); },
    getMilliseconds: function () { return this.time.getMilliseconds(); },
    getMinutes: function () { return this.time.getMinutes(); },
    getSeconds: function () { return this.time.getSeconds(); },
    getTimezoneOffset: function () { return this.time.getTimezoneOffset(); },
    getUTCHours: function () { return this.time.getUTCHours(); },
    getUTCMilliseconds: function () { return this.time.getUTCMilliseconds(); },
    getUTCMinutes: function () { return this.time.getUTCMinutes(); },
    getUTCSeconds: function () { return this.time.getUTCSeconds(); },
    setHours: function () { return this.time.setHours(); },
    setMilliseconds: function () { return this.time.setMilliseconds(); },
    setMinutes: function () { return this.time.setMinutes(); },
    setSeconds: function () { return this.time.setSeconds(); },
    setTime: function () { return this.time.setTime(); },
    setUTCHours: function () { return this.time.setUTCHours(); },
    setUTCMilliseconds: function () { return this.time.setUTCMilliseconds(); },
    setUTCMinutes: function () { return this.time.setUTCMinutes(); },
    setUTCSeconds: function () { return this.time.setUTCSeconds(); },
    toGMTString: function () { return this.time.toGMTString(); },
    toISOString: function () { return zeroPad(this.time.getHours()) + ":" + zeroPad(this.time.getMinutes()); },
    toJSON: function () { return zeroPad(this.time.getHours()) + ":" + zeroPad(this.time.getMinutes()); },
    toLocaleTimeString: function () { return this.time.toLocaleTimeString(); },
    toTimeString: function () { return this.time.toTimeString(); },
    toUTCString: function () { return this.time.toUTCString(); },
};
