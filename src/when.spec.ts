import { expect, test } from "vitest";
import { when as tkWhen } from "./when";
import { lang } from "./lang";
import { date as tkDate } from "./date";

test("baseline", () => {
  const expected = tkDate("7.minutes.ago");

  expect(tkWhen(expected)).toEqual("7 minutes ago");
});

test("seconds ago", () => {
  const expected = tkDate("5.seconds.ago");

  expect(tkWhen(expected)).toEqual("Seconds ago");
});

test("1 minute vs seconds ago", () => {
  const expected = tkDate("1.minute.ago");

  expect(tkWhen(expected)).toEqual("1 minute ago");

  const expected2 = tkDate("7.days.ago");

  expect(tkWhen(expected2)).toEqual("1 week ago");
});
