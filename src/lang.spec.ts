import { expect, test } from "vitest";
import { lang as tkLang } from "./lang";
import { hour, minute } from "./helpers";

test("baseline + plural", () => {
  expect(tkLang("6 hours and 6 minutes")).toEqual(hour(6) + minute(6));
});
