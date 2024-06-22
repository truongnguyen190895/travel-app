import { validateDate } from "../client/js/helpers";

describe("validateDate", () => {
  test("valid dates", () => {
    expect(validateDate("06/22/2024")).toBe(true);
    expect(validateDate("12/31/1999")).toBe(true);
    expect(validateDate("01/01/2000")).toBe(true);
  });

  test("invalid dates", () => {
    expect(validateDate("30/06/2024")).toBe(false); // Invalid month
    expect(validateDate("02/30/2024")).toBe(false); // Invalid day
    expect(validateDate("06/22/24")).toBe(false); // Invalid format
    expect(validateDate("06-22-2024")).toBe(false); // Invalid format
    expect(validateDate("2024/06/22")).toBe(false); // Invalid format
    expect(validateDate("")).toBe(false); // Empty string
    expect(validateDate("random text")).toBe(false); // Random text
  });
});
