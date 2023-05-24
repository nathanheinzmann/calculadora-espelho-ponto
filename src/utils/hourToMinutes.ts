const hourToMinutes = (hour: string) =>  {
  const partsHour = hour.split(":");
  const hours = parseInt(partsHour[0]);
  const minutes = parseInt(partsHour[1]);

  return hours * 60 + minutes;
};

export default hourToMinutes;