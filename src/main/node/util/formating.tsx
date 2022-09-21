export function reduceZerosToLetters(number: number) {
  return Math.abs(Number(number)) >= 1.0e+12
    ? `${(Math.abs(Number(number)) / 1.0e+12).toFixed(2)}T`
    : Math.abs(Number(number)) >= 1.0e+9
      ? `${(Math.abs(Number(number)) / 1.0e+9).toFixed(2)}B`
      : Math.abs(Number(number)) >= 1.0e+6
        ? `${(Math.abs(Number(number)) / 1.0e+6).toFixed(2)}M`
        : Math.abs(Number(number)) >= 1.0e+3
          ? `${(Math.abs(Number(number)) / 1.0e+3).toFixed(2)}T`
          : Math.abs(Number(number));
}

export function greenOrRed(number: number) {
  return number >= 0 ? 'green' : 'red';
}

export function typeOfTransaction(code: string) {
  return code.toUpperCase() === 'P' ? 'Purchase' : 'S' ? 'Sale' : 'A' ? 'Grant' : 'D' ? 'Sale to issuer' : 'F' ? 'Payment of exercise' : 'I' ? 'Discretionary' : 'M' ? 'Exercise/Conversion' : 'C' ? 'Conversion' : 'E' ? 'Expiration of short derivative position' : 'H' ? 'Expiration/Cancellation of long derivative position' : 'O' ? 'Exercise OOM' : 'X' ? 'Exercise ITM/ATM' : 'G' ? 'Gift' : 'L' ? 'Small acquisition' : 'W' ? 'Acquisition/Disposition by wills/laws' : 'Z' ? 'Deposit/Withdrawl from voting trust' : 'J' ? 'Other acquisition/disposition' : 'K' ? 'Transaction of equity swap' : 'U' ? 'Disposition due to tender of shares in change of control transaction' : code;
}

export function transactionColor(code: string) {
  return code.toUpperCase() === 'P' ? 'green' : 'S' ? 'red' : 'A' ? 'green' : 'D' ? 'red' : 'F' ? 'red' : 'I' ? 'red' : 'M' ? 'green' : 'C' ? 'green' : 'E' ? 'red' : 'H' ? 'red' : 'O' ? 'green' : 'X' ? 'green' : 'G' ? 'red' : 'L' ? 'green' : 'W' ? 'black' : 'Z' ? 'black' : 'J' ? 'black' : 'K' ? 'black' : 'U' ? 'red' : 'black';
}
