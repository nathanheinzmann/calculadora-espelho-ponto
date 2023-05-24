import { Time } from "@/components/HomePage/HomePage.types";
import { hourToMinutes, minutesToHours } from "@/utils";

const findSecondHour = (time: Time) => {
  const { first, third, fourth, needed } = time;

  const firstMinutes = hourToMinutes(first);
  const thirdMinutes = hourToMinutes(third);
  const fourthMinutes = hourToMinutes(fourth);
  const neededMinutes = hourToMinutes(needed);
  const secondHalfMinutes = fourthMinutes - thirdMinutes;
  const secondMinutes = neededMinutes - secondHalfMinutes + firstMinutes;

  return minutesToHours(secondMinutes);
};

export default findSecondHour;