# @hangar55/dtm

> An NPM package to handle date and time <br>
> Converts between ms epoch time and human date <br>
> Adds/Remove seconds, minutes, hours or days to a given date <br>
> Checks if a given date is between an interval, before or after a given date


[![NPM Version][npm-image]][npm-url]
[![Test Coverage][coveralls-image]][coveralls-url]

## Install

```bash
npm i @hangar55/dtm
```


## Methods

* convert(string/number): changes between epoch/unix time and human readable date
* string format: dd-mm-yyyy hh:mm:ss
* changeDay(time, +/- days): adds or subtracts days to a given time. Time can be either human or epoch format.
* changeHour(time, +/- hours): adds or subtracts hours to a given time. Time can be either human or epoch format.
* changeMinute(time, +/- minutes): adds or subtracts minutes to a given time. Time can be either human or epoch format.
* changeSecond(time, +/- seconds): adds or subtracts seconds to a given time. Time can be either human or epoch format.
* isBetween(date, initial date, final date): Will return true if date is between the initial and final dates. Dates must be in human format.
* isBefore(date, reference date): Will return true if date is before reference date. Dates must be in human format.
* isAfter(date, reference date): Will return true if date is after reference date. Dates must be in human format.

## Usage
```bash
const dtm = require("@hangar55/dtm");
console.log(dtm.convert(1234567890000));
prints 13-02-2009 23:31:30
console.log(dtm.convert("13-02-2009 23:31:30");
prints 1234567890000

console.log(`Now TimeZone -03:30: ${dtm.nowTimeZone("-03:30")}`);
const nowBrazil = dtm.nowTimeZone("-03:00");
console.log(`Now Brazil: ${nowBrazil}`);
console.log(`Change 2 days: ${dtm.changeDay(nowBrazil,2)}`);
console.log(`Change 2 hours: ${dtm.changeHour(nowBrazil,2)}`);
console.log(`Change 2 minutes: ${dtm.changeMinute(nowBrazil,2)}`);
console.log(`Change 2 seconds: ${dtm.changeSeconds(nowBrazil,2)}`);
console.log(dtm.isBetween("28-02-2000 23:59:59","01-01-1999 00:00:01", "29-02-2000 00:00:01"));
console.log(dtm.isAfter("28-02-2000 23:59:59", "01-01-1945 00:00:01"));
console.log(dtm.isBefore("28-02-1934 23:59:59", "01-01-1945 00:00:01"));
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/@hangar55/dtm
[npm-url]: https://www.npmjs.com/package/@hangar55/dtm
[travis-image]: https://img.shields.io/travis/live-js/@hangar55/dtm
[travis-url]: https://travis-ci.org/live-js/@hangar55/dtm
[coveralls-image]: https://img.shields.io/coveralls/live-js/@hangar55/dtm
[coveralls-url]: https://coveralls.io/r/live-js/@hangar55/dtm?branch=master
