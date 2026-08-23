<h1 align="center">@wwwares/time-kit</h1>

A small library for getting the time since a Date in a readable format.

> "8 hours ago"

## Install

```sh
pnpm add @wwwares/time-kit
```

ESM only, no dependencies.

## Example

```ts
import { when } from '@wwwares/time-kit';

// pretend it's June 23, 2021!

// String
let delay = when('June 26, 2020'); // => 11 months ago

// Date object
delay = when(new Date('June 22 2021')); // => 1 day ago

// Milliseconds
delay = when(1623643200000); // => 1 week ago
```

Pass `now` to measure from an instant other than the current time.

```ts
when('June 26, 2020', { now: 'June 23, 2021' }); // => 11 months ago
```

Future dates read the other way round:

```ts
when(new Date(Date.now() + 3_600_000)); // => in 1 hour
```

Pass `style: 'casual'` for idiomatic wording.

```ts
when(yesterday, { style: 'casual' }); // => yesterday
when(lastMonth, { style: 'casual' }); // => last month
when(threeDaysAgo, { style: 'casual' }); // => 3 days ago
```
