import { hour, minute, day, second, week } from "./helpers";

const ignoredTerms = ["and"];

const terms: { [term: string]: any } = {
  hr: hour,
  hrs: hour,
  hour,
  hours: hour,
  min: minute,
  mins: minute,
  minute,
  minutes: minute,
  day,
  days: day,
  sec: second,
  secs: second,
  second,
  seconds: second,
  week,
  weeks: week,
};

function tokenize(input: string) {
  const tokens = input.split(" ");

  return tokens.reduce<string[]>((acc, token) => {
    if (!ignoredTerms.includes(token)) {
      const stripped = token.replace(/\W/g, "");
      // If the token parses as a number, include it
      if (!isNaN(Number(stripped))) {
        acc.push(stripped);
      } else {
        // Otherwise split alphanumeric values and include
        const matches = stripped.match(/(\d+|[^\d]+)/g);
        if (Array.isArray(matches)) {
          acc.push(...matches);
        }
      }
    }
    return acc;
  }, []);
}

function convert(input: string): number {
  const tokens = tokenize(input);

  let totalMs = 0;
  for (let i = 0; i < tokens.length; i += 2) {
    const value = Number(tokens[i]);
    const unit = tokens[i + 1];
    const convertFunc = terms[unit];
    if (convertFunc) {
      totalMs += convertFunc(value);
    }
  }
  return totalMs;
}

export { convert as lang };
