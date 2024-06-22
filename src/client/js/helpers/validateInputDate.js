import dayjs from "dayjs";

export function validateDate(inputDate) {
  const format = "MM/DD/YYYY";
  const date = dayjs(inputDate, format, true);

  // Check if the inputDate is a valid date and follows the required format
  if (date.isValid() && date.format(format) === inputDate) {
    return true;
  } else {
    return false;
  }
}
