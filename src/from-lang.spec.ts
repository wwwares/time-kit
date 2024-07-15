import { expect, test, vi } from "vitest";
import { tkFromLang } from "./from-lang";
import { hour, minute } from "./helpers";

test("baseline + plural", () => {
	expect(tkFromLang("6 hours and 6 minutes")).toEqual(hour(6) + minute(6));
});

test("poor spacing/typo", () => {
	expect(tkFromLang("6hours")).toEqual(hour(6));
});

test("logs error for missing term", () => {
	const consoleMock = vi.spyOn(console, "error");
	const result = tkFromLang("2 parasecs");
	expect(result).toEqual(0);
	expect(consoleMock).toHaveBeenCalledTimes(1);
});

test("logs error for malformed token", () => {
	const consoleMock = vi.spyOn(console, "error");
	const result = tkFromLang("2 $$#@");
	expect(result).toEqual(0);
	expect(consoleMock).toHaveBeenCalledTimes(2);
});

test("should handle single valid unit without value", () => {
	const result = tkFromLang("minutes");
	expect(result).toBe(0);
});
