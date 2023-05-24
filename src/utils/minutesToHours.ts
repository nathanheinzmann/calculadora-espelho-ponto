const minutesToHours = (minutos: number) => {
  const hours = Math.floor(minutos / 60);
  const minutesRemaining = minutos % 60;

  return `${hours}:${minutesRemaining.toString().padStart(2, "0")}`;
}

export default minutesToHours;