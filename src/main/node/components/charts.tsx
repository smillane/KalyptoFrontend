import yahooFinance from "yahoo-finance";
import { format, sub } from 'date-fns'

function timeSpanParser(date: Date, timeSpanPeriod: string, timeSpanNumber: number) {
  return timeSpanPeriod.toLocaleLowerCase() === "years" 
    ? format(sub(date, {years: timeSpanNumber}), 'MM-dd-yyyy') 
      : "months" 
        ? format(sub(date, {months: timeSpanNumber}), 'MM-dd-yyyy')
          : "days"
            ? format(sub(date, {days: timeSpanNumber}), 'MM-dd-yyyy')
              : "hours"
                ? format(sub(date, {hours: timeSpanNumber}), 'MM-dd-yyyy')
                  : format(sub(date, {years: timeSpanNumber}), 'MM-dd-yyyy')
}

export function chartData(symbol: string, timeSpanPeriod: string, timeSpanNumber: number, period: string) {
  const newDate = new Date()
  const today = format(newDate, 'MM-dd-yyyy');
  const todayMinusDuration = timeSpanParser(newDate, timeSpanPeriod, timeSpanNumber)
  const data = yahooFinance.historical({
    symbol: symbol,
    from: todayMinusDuration,
    to: today,
    period: period
  }).then(function (quotes: Array<object>) {
    if (quotes[0]) {
      console.log(
        '%s\n...\n%s',
        JSON.stringify(quotes[0], null, 2),
        JSON.stringify(quotes[quotes.length - 1], null, 2)
      );
      return JSON.stringify(quotes)
    } else {
      console.log('N/A');
      console.log(today);
      console.log(todayMinusDuration);
      return null
    }
  });
  return data
}