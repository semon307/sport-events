export type TimeDifferenceType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const getDateDiff = (date1: Date, date2: Date): TimeDifferenceType => {
  let diff = Math.abs(date1.getTime() - date2.getTime()) / 1000;

  const days = Math.floor(diff / (60 * 60 * 24));
  diff -= days * 60 * 60 * 24;

  const hours = Math.floor(diff / (60 * 60));
  diff -= hours * 60 * 60;

  const minutes = Math.floor(diff / 60);
  diff -= minutes * 60;

  const seconds = Math.floor(diff);

  return {
    days,
    hours,
    minutes,
    seconds
  };
};
