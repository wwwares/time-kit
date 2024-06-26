import { test, expect } from "vitest";
import { date as tkDate } from "./date";

test("ago operation", () => {
  const date = new Date();
  date.setDate(date.getDate() + 1 * -7);

  // allow for the slightest of time lost between invocations
  expect(tkDate("1.week.ago").getTime()).toBeGreaterThanOrEqual(date.getTime());
});

test("since operation", () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  expect(tkDate("1.year.since")).toEqual(date);
});

test("time key", () => {
  expect(tkDate("1.day.ago")).toEqual(tkDate("1.days.ago"));
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
