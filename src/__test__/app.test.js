import { getDestinationImage, getDestinationWeather } from "../client/js/app";

describe("App functions", () => {
  test("getDestinationImage function should exist", () => {
    expect(typeof getDestinationImage).toBe("function");
  });

  test("getDestinationWeather function should exist", () => {
    expect(typeof getDestinationWeather).toBe("function");
  });
});
