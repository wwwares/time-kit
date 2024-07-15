// time units
type TimeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

// time unit keys
type TimeKey<Unit extends TimeUnit> = `${Unit}` | `${Unit}s`;

// operations
type TimeOperation = "ago" | "since";

// date string
type DateMathString = `${number}.${TimeKey<TimeUnit>}.${TimeOperation}`;

function date(expression: DateMathString, baseDate: Date = new Date()): Date {
  const [valueStr, unitStr, operation] = expression.split(".") as [
    string,
    TimeKey<TimeUnit>,
    TimeOperation
  ];
  const value = Number.parseInt(valueStr, 10);
  const unit = unitStr.endsWith("s")
    ? (unitStr.slice(0, -1) as TimeUnit)
    : (unitStr as TimeUnit); // Normalize unit to singular
  const date = new Date(baseDate);

  // Perform the date arithmetic
  const adjustDate = (amount: number) => {
    switch (unit) {
      case "second":
        date.setSeconds(date.getSeconds() + amount);
        break;
      case "minute":
        date.setMinutes(date.getMinutes() + amount);
        break;
      case "hour":
        date.setHours(date.getHours() + amount);
        break;
      case "day":
        date.setDate(date.getDate() + amount);
        break;
      case "week":
        date.setDate(date.getDate() + amount * 7);
        break;
      case "month":
        date.setMonth(date.getMonth() + amount);
        break;
      case "year":
        date.setFullYear(date.getFullYear() + amount);
        break;
    }
  };

  if (operation === "ago") {
    adjustDate(-value);
  } else if (operation === "since") {
    adjustDate(value);
  }

  return date;
}

export { date as tkDate };
