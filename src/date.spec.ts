import { test, expect, describe } from "vitest";
import { tkDate } from "./date";

describe("operations", () => {
  test("ago operation", () => {
    const expected = new Date();
    expected.setDate(expected.getDate() - 7);

    // allow for the slightest of time lost between invocations
    expect(tkDate("1.week.ago").getTime()).toBeGreaterThanOrEqual(
      expected.getTime()
    );
  });

  test("since operation", () => {
    const expected = new Date();
    expected.setFullYear(expected.getFullYear() + 1);

    expect(tkDate("1.year.since")).toEqual(expected);
  });

  test("incorrect string", () => {
    const expected = new Date();

    // @ts-expect-error purposefully incorrect type
    expect(tkDate("1.month")).toEqual(expected);
  });

  test("base date", () => {
    const base = new Date();
    const expected = new Date(base);

    // 1 week
    base.setDate(base.getDate() + 1 * 7);

    // 2 weeks
    expected.setDate(expected.getDate() + 1 * 14);

    // add another week
    expect(tkDate("1.week.since", base)).toEqual(expected);
  });
});

describe("units", () => {
  test("day unit", () => {
    const expected = new Date();
    expected.setDate(expected.getDate() - 1);

    expect(tkDate("1.day.ago")).toEqual(expected);
    expect(tkDate("1.days.ago")).toEqual(expected);
  });

  test("hour unit", () => {
    const expected = new Date();
    expected.setHours(expected.getHours() - 1);

    expect(tkDate("1.hour.ago")).toEqual(expected);
  });

  test("minute unit", () => {
    const expected = new Date();
    expected.setMinutes(expected.getMinutes() - 1);

    expect(tkDate("1.minute.ago")).toEqual(expected);
  });

  test("second unit", () => {
    const expected = new Date();
    expected.setSeconds(expected.getSeconds() - 1);

    expect(tkDate("1.second.ago")).toEqual(expected);
  });

  test("month unit", () => {
    const expected = new Date();
    expected.setMonth(expected.getMonth() - 1);

    expect(tkDate("1.month.ago")).toEqual(expected);
  });
});
