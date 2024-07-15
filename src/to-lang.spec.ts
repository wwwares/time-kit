import { expect, test } from "vitest";
import { tkToLang } from "./to-lang";
import { tkDate } from "./date";

test("baseline", () => {
  const expected = tkDate("7.minutes.ago");

  expect(tkToLang(expected)).toEqual("7 minutes ago");
});

test("seconds ago", () => {
  const expected = tkDate("5.seconds.ago");

  expect(tkToLang(expected)).toEqual("Seconds ago");
});

test("1 minute vs seconds ago", () => {
  const expected = tkDate("1.minute.ago");

  expect(tkToLang(expected)).toEqual("1 minute ago");

  const expected2 = tkDate("7.seconds.ago");

  expect(tkToLang(expected2)).toEqual("Seconds ago");
});

test("date as string", () => {
  const expected = new Date().toString();
  expect(tkToLang(expected)).toEqual("Seconds ago");
});
