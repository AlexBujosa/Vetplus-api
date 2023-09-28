export function generateRandomSixDigitNumber() {
  const min = 100000; // Minimum six-digit number
  const max = 999999; // Maximum six-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
