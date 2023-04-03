export const getDayMonthYearDate = (dateStart: Date, dateEnd: Date): string => {
  const startDay = dateStart.getDate();
  const startMonth = dateStart.getMonth() + 1;
  const startYear = dateStart.getFullYear();

  const endDay = dateEnd.getDate();
  const endMonth = dateEnd.getMonth() + 1;
  const endYear = dateEnd.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    if (startDay === endDay) {
      return `${startDay.toString().padStart(2, '0')}.${startMonth.toString().padStart(2, '0')}.${startYear}`;
    } else {
      return `${startDay.toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}.${startMonth.toString().padStart(2, '0')}.${startYear}`;
    }
  } else if (startYear === endYear) {
    return `${startDay.toString().padStart(2, '0')}.${startMonth.toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}.${endMonth.toString().padStart(2, '0')}.${startYear}`;
  } else {
    return `${startDay.toString().padStart(2, '0')}.${startMonth.toString().padStart(2, '0')}.${startYear}-${endDay.toString().padStart(2, '0')}.${endMonth.toString().padStart(2, '0')}.${endYear}`;
  }
};
