export const reduceFifteenMinutesLess = (
  hour: number,
  minute: number,
): { hour: number; minute: number } => {
  const fifteenMinutesLess =
    minute - 15 >= 0
      ? { hour, minute: minute - 15 }
      : { hour: hour - 1, minute: 45 + minute };

  const { hour: hourProcessed, minute: minuteProcessed } = fifteenMinutesLess;

  return { hour: hourProcessed, minute: minuteProcessed };
};

export const reduceThreeHourLess = (
  hour: number,
  minute: number,
): { hour: number; minute: number } => {
  const threeHoursLess =
    hour - 3 >= 0
      ? { hour: hour - 3, minute: minute }
      : { hour: 21 + hour, minute: minute };

  const { hour: hourProcessed, minute: minuteProcessed } = threeHoursLess;

  return { hour: hourProcessed, minute: minuteProcessed };
};
