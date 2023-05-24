import { Time } from "@/components/HomePage/HomePage.types";
import { hourToMinutes, minutesToHours } from "@/utils";

const findThirdHour = (time: Time) => {
  const { first, second, fourth, needed } = time;

  const firstMinutes = hourToMinutes(first);
  const secondMinutes = hourToMinutes(second);
  const fourthMinutes = hourToMinutes(fourth);
  const neededMinutes = hourToMinutes(needed);
  const firstHalfMinutes = secondMinutes - firstMinutes;
  const thirdMinutes = fourthMinutes - neededMinutes + firstHalfMinutes;

  return minutesToHours(thirdMinutes);
};

export default findThirdHour;