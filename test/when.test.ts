import { describe, expect, it } from 'vitest';

import { when, type DateInput } from '../src/index.ts';

const NOW = new Date('2021-06-23T00:00:00Z');
const MS = NOW.getTime();

const fromNow = (date: DateInput) => when(date, { now: NOW });
const span = (from: string, to: string) => when(from, { now: to });

describe('when', () => {
  it.each([
    ['the same instant', MS, 'seconds ago'],
    ['1.999 seconds earlier', MS - 1_999, 'seconds ago'],
    ['1 second later', MS + 1_000, 'seconds ago'],
    ['5 seconds earlier', MS - 5_000, '5 seconds ago'],
    ['1 minute earlier', MS - 60_000, '1 minute ago'],
    ['1 day earlier', MS - 86_400_000, '1 day ago'],
    ['9 days earlier', '2021-06-14', '1 week ago'],
    ['almost a year earlier', '2020-06-26', '11 months ago'],
    ['6 years earlier', '2015-01-01', '6 years ago'],
    ['5 seconds later', MS + 5_000, 'in 5 seconds'],
    ['1 day later', MS + 86_400_000, 'in 1 day'],
    ['3 years later', '2024-06-23', 'in 3 years'],
  ])('reads %s as "%s"', (_label, date, expected) => {
    expect(fromNow(date)).toBe(expected);
  });

  // Months and years come off the calendar, not off an average month length.
  it.each([
    ['2021-01-01', '2024-01-01', '3 years ago'],
    ['2020-03-01', '2021-03-01', '1 year ago'],
    ['2021-02-01', '2021-03-01', '1 month ago'],
    ['2021-01-01', '2021-01-31', '4 weeks ago'],
    ['2021-01-15', '2021-02-14', '4 weeks ago'],
    ['2021-01-15', '2021-02-15', '1 month ago'],
    ['2021-01-31', '2021-03-01', '1 month ago'],
    ['2020-02-29', '2021-03-01', '1 year ago'],
    ['2020-01-01', '2021-11-01', '1 year ago'],
  ])('reads %s to %s as "%s"', (from, to, expected) => {
    expect(span(from, to)).toBe(expected);
  });

  it('accepts strings, numbers, and Dates', () => {
    expect(fromNow('June 22 2021 00:00:00 GMT')).toBe('1 day ago');
    expect(fromNow(MS - 3_600_000)).toBe('1 hour ago');
    expect(fromNow(new Date(MS - 604_800_000))).toBe('1 week ago');
  });

  it('defaults `now` to the current time', () => {
    expect(when(new Date())).toBe('seconds ago');
  });

  it('rejects unreadable input', () => {
    expect(() => when('not a date')).toThrow(TypeError);
  });

  describe("style: 'casual'", () => {
    const casual = (date: DateInput) =>
      when(date, { now: NOW, style: 'casual' });

    it('rewords where English has an idiomatic form', () => {
      expect(casual('2021-06-22')).not.toBe(fromNow('2021-06-22'));
      expect(casual(NOW)).not.toBe(fromNow(NOW));
    });

    it('matches the numeric wording everywhere else', () => {
      expect(casual('2021-06-20')).toBe(fromNow('2021-06-20'));
      expect(casual('2018-06-23')).toBe(fromNow('2018-06-23'));
    });
  });
});
