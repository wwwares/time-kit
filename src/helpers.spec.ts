import { expect, test } from "vitest";
import { day, hour, minute, month, ms, second, week, year } from "./helpers";

test("ms", () => {
	expect(ms(1)).toEqual(1000 * 1);
});

test("second", () => {
	expect(second(1)).toEqual(1000 * 1);
});

test("minute", () => {
	expect(minute(1)).toEqual(1000 * 1 * 60);
});

test("hour", () => {
	expect(hour(1)).toEqual(1000 * 1 * 60 * 60);
});

test("day", () => {
	expect(day(1)).toEqual(1000 * 1 * 60 * 60 * 24);
});

test("week", () => {
	expect(week(1)).toEqual(1000 * 1 * 60 * 60 * 24 * 7);
});

test("month", () => {
	expect(month(1)).toEqual(1000 * 1 * 60 * 60 * 24 * 30.436875);
});

test("year", () => {
	expect(year(1)).toEqual(1000 * 1 * 60 * 60 * 24 * 30.436875 * 12);
});
