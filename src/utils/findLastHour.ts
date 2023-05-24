import { Time } from "@/components/HomePage/HomePage.types";
import { hourToMinutes, minutesToHours } from "@/utils";

const findLastHour = (time: Time) => {
  const { first, second, third, needed } = time;

  const firstMinutes = hourToMinutes(first);
  const secondMinutes = hourToMinutes(second);
  const thirdMinutes = hourToMinutes(third);
  const neededMinutes = hourToMinutes(needed);
  const firstHalfMinutes = secondMinutes - firstMinutes;
  const fourthMinutes = neededMinutes - firstHalfMinutes + thirdMinutes;

  return minutesToHours(fourthMinutes);
};

export default findLastHour;