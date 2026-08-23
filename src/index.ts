const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

// Only units of fixed length belong here. Months and years vary in length, so
// they get counted off the calendar instead — see `monthsBetween`.
const UNITS = [
  ['second', SECOND],
  ['minute', MINUTE],
  ['hour', HOUR],
  ['day', DAY],
  ['week', WEEK],
] as const;

/** Anything that can be read as an instant in time. */
export type DateInput = Date | number | string;

/** How a result is worded. */
export type Style = 'numeric' | 'casual';

export interface WhenOptions {
  /**
   * The instant to measure from. Handy for tests and for formatting a delta
   * between two arbitrary dates.
   *
   * @default new Date()
   */
  now?: DateInput;

  /**
   * `'numeric'` counts every result: `'1 day ago'`, `'in 1 day'`.
   * `'casual'` prefers idiomatic wording where English has it: `'yesterday'`,
   * `'tomorrow'`, `'last month'`, `'now'`.
   *
   * @default 'numeric'
   */
  style?: Style;
}

const FORMATTERS: Record<Style, Intl.RelativeTimeFormat> = {
  numeric: new Intl.RelativeTimeFormat('en', { numeric: 'always' }),
  casual: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
};

function toDate(value: DateInput): Date {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError(
      `@wwwares/time-kit: could not read \`${String(value)}\` as a date.`
    );
  }

  return date;
}

/** Whole calendar months between two dates, where `earlier <= later`. */
function monthsBetween(earlier: Date, later: Date): number {
  const months =
    (later.getFullYear() - earlier.getFullYear()) * 12 +
    (later.getMonth() - earlier.getMonth());

  // That last month only counts once we reach the same day of the month.
  return later.getDate() < earlier.getDate() ? months - 1 : months;
}

/** The largest unit that fits, and how many of it have passed. */
function getUnitAndCount(
  elapsed: number,
  months: number
): [count: number, unit: Intl.RelativeTimeFormatUnit] {
  if (months >= 12) return [Math.floor(months / 12), 'year'];
  if (months >= 1) return [months, 'month'];

  const [name, magnitude] =
    UNITS.findLast(([, ms]) => elapsed >= ms) ?? UNITS[0];
  return [Math.floor(elapsed / magnitude), name];
}

/**
 * Describe how far `date` is from now, in a readable format.
 *
 * Past dates read as `'2 hours ago'`, future dates as `'in 2 hours'`. Months
 * and years are counted off the calendar, so an anniversary reads as exactly
 * `'1 year ago'` regardless of how many days the intervening months held.
 *
 * @example
 * ```ts
 * when(new Date(Date.now() + 60_000)); // => 'in 1 minute'
 * when(new Date(Date.now() - 60_000)); // => '1 minute ago'
 * ```
 */
export function when(date: DateInput, options: WhenOptions = {}): string {
  const { style = 'numeric' } = options;
  const rtf = FORMATTERS[style];

  const now = toDate(options.now ?? new Date());
  const then = toDate(date);

  // Positive when `date` is in the past, negative when it is ahead of us.
  const delta = now.getTime() - then.getTime();
  const elapsed = Math.abs(delta);

  if (elapsed < 2 * SECOND) {
    return style === 'casual' ? rtf.format(0, 'second') : 'seconds ago';
  }

  const months =
    delta >= 0 ? monthsBetween(then, now) : monthsBetween(now, then);
  const [count, unit] = getUnitAndCount(elapsed, months);

  return rtf.format(delta < 0 ? count : -count, unit);
}
