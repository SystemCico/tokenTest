/**
 * @overview Time checks.
 * @module is
 */

module.exports = function (is) {

  var days = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];

  var months = [
    'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december'
  ];

  /**
   * Checks if the given date is for today.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for today.
   * @example
   * is.today(new Date()); // true
   * is.today(dateObjectForToday); // true
   * is.today(dateObjectNotForToday); // false
   */
  is.today = function (date) {
    return is.date(date) && date.toDateString() === new Date().toDateString();
  };

  /**
   * Checks if the given date is for yesterday.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for yesterday.
   * @example
   * is.yesterday(dateObjectForYesterday); // true
   * is.yesterday(dateObjectNotForYesterday); // false
   * is.yesterday(new Date()); // false
   */
  is.yesterday = function (obj) {
    var now = new Date();

    return is.date(obj) && obj.toDateString() ===
      new Date(now.setDate(now.getDate() - 1)).toDateString();
  };

  /**
   * Checks if the given date is for tomorrow.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for tomorrow.
   * @example
   * is.tomorrow(dateObjectForTomorrow); // true
   * is.tomorrow(dateObjectNotForTomorrow); // false
   * is.tomorrow(new Date()); // false
   */
  is.tomorrow = function (obj) {
    var now = new Date();

    return is.date(obj) && obj.toDateString() ===
      new Date(now.setDate(now.getDate() + 1)).toDateString();
  };

  /**
   * Checks if the given date is for the past.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for the past.
   * @example
   * is.past(dateObjectForTomorrow); // true
   * is.past(dateObjectNotForTomorrow); // false
   * is.past(new Date()); // false
   */
  is.past = function (obj) {
    return is.date(obj) && obj.getTime() < new Date().getTime();
  };

  /**
   * Checks if the given date is for the future.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for the future.
   * @example
   * is.future(dateObjectForTheFuture); // true
   * is.future(dateObjectNotForTheFuture); // false
   * is.future(new Date()); // false
   */
  is.future = function (date) {
    return is.not.past(date);
  };

  /**
   * Checks if the given date is for the given day of the week. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @param {Date} date The date to check.
   * @param {String} day The day of the week to check for.
   * @return {Boolean} Whether the date is for that day of the week.
   * @example
   * is.day(dateObjectForAnyMonday, 'monday'); // true
   * is.day(dateObjectForAnySaturday, 'monday'); // false
   */
  is.day = function (date, day) {
    return is.date(date) && day.toLowerCase() === days[date.getDay()];
  };

  is.day.api = ['not'];

  /**
   * Checks if the given date is for the given month of the year. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @param {Date} date The date to check.
   * @param {String} month The month of the year to check for.
   * @return {Boolean} Whether the date is for that month of the year.
   * @example
   * is.month(dateObjectForNovember, 'november'); // true
   * is.month(dateObjectForJanuary, 'november'); // false
   */
  is.month = function (date, month) {
    return is.date(date) && month.toLowerCase() === months[date.getMonth()];
  };

  is.month.api = ['not'];

  /**
   * Checks if the given date is for the given year. This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @param {Date} date The date to check.
   * @param {Number} year The year to check for.
   * @return {Boolean} Whether the date is for that year.
   * @example
   * is.year(dateObjectFor2016, 2016); // true
   * is.year(dateObjectFor2012, 2016); // false
   */
  is.year = function (date, year) {
    return is.date(date) && is.number(year) && year === date.getFullYear();
  };

  is.year.api = ['not'];

  /**
   * Checks if the given year is a leap year.
   *
   * @param {Number} year The year to check.
   * @return {Boolean} Whether the date is a leap year.
   * @example
   * is.leapYear(2016); // true
   * is.leapYear(2015); // false
   */
  is.leapYear = function (year) {
    return is.number(year) && (
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    );
  };

  /**
   * Checks if the given date is for a weekend day.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for a weekend day.
   * @example
   * is.weekend(dateObjectForSaturday); // true
   * is.weekend(dateObjectForSunday); // true
   * is.weekend(dateObjectForMonday); // false
   * is.weekend(dateObjectForFriday); // false
   */
  is.weekend = function (date) {
    return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);
  };

  /**
   * Checks if the given date is for a weekday.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is for a weekday.
   * @example
   * is.weekday(dateObjectForMonday); // true
   * is.weekday(dateObjectForFriday); // true
   * is.weekday(dateObjectForSaturday); // false
   * is.weekday(dateObjectForSunday); // false
   */
  is.weekday = function (date) {
    return is.not.weekend(date);
  };

  /**
   * Checks if the given date is within the start and end range. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @param {Date} date The date to check.
   * @param {Date} start The starting date.
   * @param {Date} end The ending date.
   * @return {Boolean} Whether the date is within the range.
   * @example
   * is.inDateRange(new Date(), past, future); // true
   * is.inDateRange(new Date(), new Date(), new Date()); // false
   */
  is.inDateRange = function (date, start, end) {
    if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {
      return false;
    }

    return date.getTime() > start.getTime() && date.getTime() < end.getTime();
  };

  is.inDateRange.api = ['not'];

  /**
   * Checks if the given date is within last week's range.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is within last week.
   * @example
   * is.inLastWeek(dateObjectForLastWeek); // true
   * is.inLastWeek(new Date()); // false
   */
  is.inLastWeek = function (date) {
    return is.inDateRange(date,
      new Date(new Date().setDate(new Date().getDate() - 7)),
      new Date());
  };

  /**
   * Checks if the given date is within last month's range.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is within last month.
   * @example
   * is.inLastMonth(dateObjectForLastMonth); // true
   * is.inLastMonth(new Date()); // false
   */
  is.inLastMonth = function (date) {
    return is.inDateRange(date,
      new Date(new Date().setMonth(new Date().getMonth() - 1)),
      new Date());
  };

  /**
   * Checks if the given date is within last year's range.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is within last year.
   * @example
   * is.inLastYear(dateObjectForLastYear); // true
   * is.inLastYear(new Date()); // false
   */
  is.inLastYear = function (date) {
    return is.inDateRange(date,
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      new Date());
  };

  /**
   * Checks if the given date is within next week's range.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is within next week.
   * @example
   * is.inNextWeek(dateObjectForNextWeek); // true
   * is.inNextWeek(new Date()); // false
   */
  is.inNextWeek = function (obj) {
    return is.inDateRange(obj, new Date(),
      new Date(new Date().setDate(new Date().getDate() + 7)));
  };

  /**
   * Checks if the given date is within next month's range.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is within next month.
   * @example
   * is.inNextMonth(dateObjectForNextMonth); // true
   * is.inNextMonth(new Date()); // false
   */
  is.inNextMonth = function (obj) {
    return is.inDateRange(obj, new Date(),
      new Date(new Date().setMonth(new Date().getMonth() + 1)));
  };

  /**
   * Checks if the given date is within next year's range.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is within next year.
   * @example
   * is.inNextYear(dateObjectForNextYear); // true
   * is.inNextYear(new Date()); // false
   */
  is.inNextYear = function (obj) {
    return is.inDateRange(obj, new Date(),
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  };

  /**
   * Checks if the given date is within the given quarter. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @param {Date} date The date to check.
   * @param {Number} quarter The quarter to check for.
   * @return {Boolean} Whether the date is within the quarter.
   * @example
   * is.quarterOfYear(dateObjectForSecondQuarter, 2); // true
   * is.quarterOfYear(dateObjectForSecondQuarter, 1); // true
   */
  is.quarterOfYear = function (date, quarter) {
    return is.date(date) && is.number(quarter) &&
      quarter === Math.floor((date.getMonth() + 3) / 3);
  };

  is.quarterOfYear.api = ['not'];

  /**
   * Checks if the given date is in daylight saving time.
   *
   * @param {Date} date The date to check.
   * @return {Boolean} Whether the date is in daylight saving time.
   * @deprecated This method will be removed in the next version! Use a library
   * like moment.js for this instead.
   * @example
   * is.dayLightSavingTime(dateObjectOnDST); // true
   * is.dayLightSavingTime(dateObjectNotOnDST); // true
   */
  is.dayLightSavingTime = function (date) {
    console.warn('`dayLightSavingTime` method will be removed in the next version! Use a library like moment.js for this instead.');

    var january = new Date(date.getFullYear(), 0, 1);
    var july = new Date(date.getFullYear(), 6, 1);
    var stdTimezoneOffset = Math.max(january.getTimezoneOffset(),
      july.getTimezoneOffset());

    return date.getTimezoneOffset() < stdTimezoneOffset;
  };

};
