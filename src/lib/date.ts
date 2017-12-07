const zeroPad = (value: number) => `${value < 10 ? '0' : ''}${value}`;

export function DateOnly(date?: number | string | Date | DateOnly) {
  if (typeof date === 'undefined') {
    date = new Date();
  } else if (date instanceof DateOnly) {
    date = new Date(date.toString());
  } else if (typeof date === 'number') {
    let dateObject = new Date();
    dateObject.setFullYear(Math.round(date / 10000));
    dateObject.setMonth(Math.round((date % 10000) / 100) - 1);
    dateObject.setDate(date % 100);
    date = dateObject;
  } else {
    date = new Date(date);
  }

  Object.defineProperty(this, 'date', {
    value: date,
    enumerable: false
  });
}

DateOnly.prototype = {
  toString:  function(): string { return `${this.date.getFullYear()}-${zeroPad(this.date.getMonth()+1)}-${zeroPad(this.date.getDate())}` },
  valueOf: function(): number { return this.date.getFullYear() * 10000 + (this.date.getMonth()+1) * 100 + this.date.getDate() },
  getDate: function(): number { return this.date.getDate() },
  getDay: function(): number { return this.date.getDay() },
  getFullYear: function(): number { return this.date.getFullYear() },
  getMonth: function(): number { return this.date.getMonth() },
  getUTCDate: function(): number { return this.date.getUTCDate() },
  getUTCDay: function(): number { return this.date.getUTCDay() },
  getUTCFullYear: function(): number { return this.date.getUTCFullYear() },
  getUTCMonth: function(): number { return this.date.getUTCMonth() },
  getYear: function(): number { return this.date.getYear() },
  setDate: function(): number { return this.date.setDate() },
  setFullYear: function(): number { return this.date.setFullYear() },
  setHours: function(): number { return this.date.setHours() },
  setMonth: function(): number { return this.date.setMonth() },
  setUTCDate: function(): number { return this.date.setUTCDate() },
  setUTCFullYear: function(): number { return this.date.setUTCFullYear() },
  setUTCMinutes: function(): number { return this.date.setUTCMinutes() },
  setUTCMonth: function(): number { return this.date.setUTCMonth() },
  setYear: function(): number { return this.date.setYear() },
  toDateString: function(): number { return this.date.toDateString() },
  toGMTString: function(): number { return this.date.toGMTString() },
  toISOString: function(): string { return `${this.date.getFullYear()}-${zeroPad(this.date.getMonth()+1)}-${zeroPad(this.date.getDate())}` },
  toJSON: function(): string { return `${this.date.getFullYear()}-${zeroPad(this.date.getMonth()+1)}-${zeroPad(this.date.getDate())}` },
  toLocaleDateString: function(): number { return this.date.toLocaleDateString() },
  toUTCString: function(): number { return this.date.toUTCString() }
};

const timePrecision = (precision: string | number) => {
  if (typeof precision === 'number') {
    return precision;
  } else {
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

export function TimeOnly(time?: number | string | Date | TimeOnly, precision?: number) {
  if (typeof time === 'undefined') {
    time = new Date();
  } else if (typeof time === 'number') {
    let date = new Date();
    precision = timePrecision(precision);

    if (precision < 60) {
      date.setHours(Math.round(time / 10000));
      date.setMinutes(Math.round((time % 10000) / 100));
      date.setSeconds(time % 100);
    } else if (precision >= 60 && precision < 3600) {
      date.setHours(Math.round(time / 100));
      date.setMinutes(time % 100);
    } else {
      date.setHours(time);
    }
    time = date;
  } else if (time instanceof TimeOnly) {
    time = new Date(time.toString());
  } else if (typeof time === 'string' && time.match(/\d?\d:\d\d/)) {
    const parts = time.split(':');
    time = new Date();

    time.setHours(parseInt(parts[0]));
    time.setMinutes(parseInt(parts[1]));
  } else {
    time = new Date(time);
  }

  Object.defineProperty(this, 'time', {
    value: time,
    enumerable: false
  });
}

TimeOnly.prototype = {
  toString: function(): string { return `${zeroPad(this.time.getHours())}:${zeroPad(this.time.getMinutes())}` },
  valueOf: function(precision?: string | number): number {
    if (typeof precision === 'string' && precision.match(/seconds$/)
        || typeof precision === 'number' && precision < 60) {
      return this.time.getHours() * 10000 + this.time.getMinutes() * 100 + this.time.getSeconds();
    } else {
      return this.time.getHours() * 100 + this.time.getMinutes();
    }
  },
  getHours: function(): number { return this.time.getHours() },
  getMilliseconds: function(): number { return this.time.getMilliseconds() },
  getMinutes: function(): number { return this.time.getMinutes() },
  getSeconds: function(): number { return this.time.getSeconds() },
  getTimezoneOffset: function(): number { return this.time.getTimezoneOffset() },
  getUTCHours: function(): number { return this.time.getUTCHours() },
  getUTCMilliseconds: function(): number { return this.time.getUTCMilliseconds() },
  getUTCMinutes: function(): number { return this.time.getUTCMinutes() },
  getUTCSeconds: function(): number { return this.time.getUTCSeconds() },
  setHours: function(): number { return this.time.setHours() },
  setMilliseconds: function(): number { return this.time.setMilliseconds() },
  setMinutes: function(): number { return this.time.setMinutes() },
  setSeconds: function(): number { return this.time.setSeconds() },
  setTime: function(): number { return this.time.setTime() },
  setUTCHours: function(): number { return this.time.setUTCHours() },
  setUTCMilliseconds: function(): number { return this.time.setUTCMilliseconds() },
  setUTCMinutes: function(): number { return this.time.setUTCMinutes() },
  setUTCSeconds: function(): number { return this.time.setUTCSeconds() },
  toGMTString: function(): number { return this.time.toGMTString() },
  toISOString: function(): string { return `${zeroPad(this.time.getHours())}:${zeroPad(this.time.getMinutes())}` },
  toJSON: function(): string { return `${zeroPad(this.time.getHours())}:${zeroPad(this.time.getMinutes())}` },
  toLocaleTimeString: function(): number { return this.time.toLocaleTimeString() },
  toTimeString: function(): number { return this.time.toTimeString() },
  toUTCString: function(): number { return this.time.toUTCString() },
};
