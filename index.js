class dtm{ 

  convert(time = Date.now()){
    if(typeof time == 'number'){
      return this.returnFormated(time);
    }
    else if(typeof time == 'string'){
     return this.returnEpoch(time);

    }
    else{
      return `Format not supported ${typeof time}`;
    }
  }

  nowTimeZone(timeZone){
    const array3 = timeZone.toString().split(":");
    var hour = parseInt(array3[0]);
    var minutes = parseInt(array3[1]);
    var now = Date.now();

    return this.returnFormated(this.changeHour(this.changeMinute(now,minutes),hour));

  }

  changeDay(time, days){
    if(typeof time == 'number'){
      return parseInt(time)+parseInt(days)*24*60*60*1000;
    }
    else if(typeof time == 'string'){
     var dateEpoch = this.returnEpoch(time);
     return this.returnFormated(dateEpoch+parseInt(days)*24*60*60*1000);
    }
    else{
      return `Format not supported ${typeof time}`;
    }
  }

  changeHour(time, hour){
    if(typeof time == 'number'){
      return parseInt(time)+parseInt(hour)*60*60*1000;
    }
    else if(typeof time == 'string'){
     var dateEpoch = this.returnEpoch(time);
     return this.returnFormated(dateEpoch+parseInt(hour)*60*60*1000);
    }
    else{
      return `Format not supported ${typeof time}`;
    }
  }
  
  changeMinute(time, minutes){
    if(typeof time == 'number'){
      return parseInt(time)+parseInt(minutes)*60*1000;
    }
    else if(typeof time == 'string'){
     var dateEpoch = this.returnEpoch(time);
     return this.returnFormated(dateEpoch+parseInt(minutes)*60*1000);
    }
    else{
      return `Format not supported ${typeof time}`;
    }
  }

  changeSecond(time, seconds){
    if(typeof time == 'number'){
      return parseInt(time)+parseInt(seconds)*1000;
    }
    else if(typeof time == 'string'){
     var dateEpoch = this.returnEpoch(time);
     return this.returnFormated(dateEpoch+parseInt(seconds)*1000);
    }
    else{
      return `Format not supported ${typeof time}`;
    }
  }

  isBetween(time, initTime, finalTime){
    const eTime = this.returnEpoch(time);
    const eInitTime = this.returnEpoch(initTime);
    const eFinalTime = this.returnEpoch(finalTime);
    
    if(eFinalTime <= eInitTime){
      if(eFinalTime <= eTime && eInitTime >= eTime){
        return true;
      }else{
      return false;
      }
    }else{
      if(eInitTime <= eTime && eFinalTime >= eTime){
      return true;
      }else{
      return false;
      }
    }
  }

  isBefore(time, refTime){
    const eTime = this.returnEpoch(time);
    const eRefTime = this.returnEpoch(refTime);
    if(eTime < eRefTime){
      return true;
    }else{
      return false;
    }
  }

  isAfter(time, refTime){
    const eTime = this.returnEpoch(time);
    const eRefTime = this.returnEpoch(refTime);
    if(eTime > eRefTime){
      return true;
    }else{
      return false;
    }
  }



  returnFormated(epoch){

    
    epoch = this.divisionUnsigned(epoch,1000);

     // Step 1.
     let unixMinutes = this.divisionUnsigned(epoch, 60);
     let seconds = this.remainderUnsigned(epoch, 60);

     // Step 2.
     let unixHours = this.divisionUnsigned(unixMinutes, 60);
     let minutes = this.remainderUnsigned(unixMinutes, 60);

     // Step 3.
     let unixDays = this.divisionUnsigned(unixHours, 24);
     let hour = this.remainderUnsigned(unixHours, 24);

     // Step 4.
     let cycle400Y = this.divisionUnsigned(unixDays, 146097);
     let daysIn400Y = this.remainderUnsigned(unixDays, 146097);

     // Step 5.
     if (daysIn400Y >= 32 * 1461 + 789) daysIn400Y++;
     if (daysIn400Y >= 57 * 1461 + 789) daysIn400Y++;
     if (daysIn400Y >= 82 * 1461 + 789) daysIn400Y++;

     // Step 6.
     let cycle4Y = this.divisionUnsigned(daysIn400Y, 1461);
     let daysIn4Y = this.remainderUnsigned(daysIn400Y, 1461);

     // Step 7.
     if (daysIn4Y >= 59) daysIn4Y++;
     if (daysIn4Y >= 425) daysIn4Y++;
     if (daysIn4Y >= 1157) daysIn4Y++;

     // Step 8.
     let yearIn4Y = this.divisionUnsigned(daysIn4Y, 366);
     let daysInYear = this.remainderUnsigned(daysIn4Y, 366);

     // Step 9.
     let year = yearIn4Y + cycle4Y * 4 + cycle400Y * 400 + 1970;

     // Step 10.
     const monthTable = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
     var monthCount = 0;
     while (daysInYear >= monthTable[monthCount]) {
          daysInYear -= monthTable[monthCount];
         monthCount++;
     }
     let month = monthCount + 1;
     let day = daysInYear + 1;

    return `${this.formatZeroFill(day)}-${this.formatZeroFill(month)}-${year} ${this.formatZeroFill(hour)}:${this.formatZeroFill(minutes)}:${this.formatZeroFill(seconds)}`;
  }

  returnEpoch(data){
    
 
    const array = data.toString().split(" ");
    
    const array2 = array[0].toString().split("-");
    const array3 = array[1].toString().split(":");
    var day= parseInt(array2[0]);
    var month = parseInt(array2[1]);
    var year = parseInt(array2[2]);
    var hour = parseInt(array3[0]);
    var minutes = parseInt(array3[1]);
    var seconds = parseInt(array3[2]);
    if(year < 1970){
      hour = hour - 23;
      minutes = minutes - 59;
      seconds = seconds - 60;
    }

    // Step 1.
    const yearsSince1970 = year - 1970;

    // Step 2.
    const cycles400Y = this.divisionUnsigned(yearsSince1970, 400);
    const yearIn400YCycle = this.remainderUnsigned(yearsSince1970, 400);

    // Step 3.
    const cycles4Yin400Y = this.divisionUnsigned(yearIn400YCycle , 4);
    const yearIn4YCycle = this.remainderUnsigned(yearIn400YCycle , 4);

    // Step 4.
    const daysInYearBefore4YCycle = 365 * yearIn4YCycle + (yearIn4YCycle == 3 ? 1 : 0);

    // Step 5.
    let daysInYear = day - 1;
    const monthTable = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (var i = 0; i < month - 1; i++) {
      daysInYear += monthTable[i];
    }

    // Step 6.
    let days = daysInYear
            + daysInYearBefore4YCycle
            + cycles4Yin400Y * 1461
            + cycles400Y * 146097;

    // Step 7.
    if (yearIn4YCycle == 2 && month > 2) days++;
    if (yearIn400YCycle > 130 || (yearIn400YCycle == 130 && month > 2)) days--;
    if (yearIn400YCycle > 230 || (yearIn400YCycle == 230 && month > 2)) days--;
    if (yearIn400YCycle > 330 || (yearIn400YCycle == 330 && month > 2)) days--;

    // Step 8
    if(year >= 1970 && month > 2) days--;
    if(year <1970 && month <= 2) days++;

    // Step 9.
  
    return ((seconds + 60 * minutes + 60 * 60 * hour + 60 * 60 * 24 * days)*1000);


    
  }


  remainderUnsigned(a, b) {
    return (a >= 0)
            ? a % b // Positive
            : (b + (a % b)) % b; // Negative
}

divisionUnsigned(a, b) {
  return Math.floor(a/b);
}

formatZeroFill(a){
  return (a < 10) ? '0' + a : a;
    
}


}


module.exports = new dtm;