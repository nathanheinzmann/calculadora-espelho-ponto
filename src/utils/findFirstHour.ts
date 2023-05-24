import { Time } from "@/components/HomePage/HomePage.types";
import { hourToMinutes, minutesToHours } from "@/utils";

const findFirstHour = (time: Time) => {
  const { second, third, fourth, needed } = time;

  const secondMinutes = hourToMinutes(second);
  const thirdMinutes = hourToMinutes(third);
  const fourthMinutes = hourToMinutes(fourth);
  const neededMinutes = hourToMinutes(needed);
  const secondHalfMinutes = fourthMinutes - thirdMinutes;
  const firstMinutes = secondMinutes - neededMinutes + secondHalfMinutes;

  return minutesToHours(firstMinutes);
};

export default findFirstHour;