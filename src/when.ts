import { day, hour, minute, month, second, week, year } from "./helpers";

const SEC = second(1);
const MIN = minute(1);
const HOUR = hour(1);
const DAY = day(1);
const WEEK = week(1);
const MONTH = month(1); // average month
const YEAR = year(1);

const suffixes = ["second", "minute", "hour", "day", "week", "month", "year"];
const magnitudes = [SEC, MIN, HOUR, DAY, WEEK, MONTH, YEAR];

function when(date: Date | number | string): string {
  const now = new Date();
  const then = typeof date === "object" ? date : new Date(date);

  //@ts-ignore its fiiiiine
  const delta = Math.abs(now - then);

  let i = 0;
  // <= prioritizes larger suffixes over smaller. ie. 60 seconds vs 1 minute
  while (i < magnitudes.length && magnitudes[i] <= delta) {
    i++;
  }

  const duration = Math.floor(delta / magnitudes[i - 1]);
  const suffix = duration === 1 ? suffixes[i - 1] : suffixes[i - 1] + "s";

  if (suffix === "second" || delta < MIN) return "Seconds ago";

  return `${duration} ${suffix} ago`;
}

export { when };
