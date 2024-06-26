export const mult = (x: number) => (time: number) => x * time;

export const ms = mult(1000);

export const second = (num: number) => ms(num);

export const minute = (num: number) => num * ms(60);

export const hour = (num: number) => minute(num * 60);

export const day = (num: number) => hour(num * 24);

export const week = (num: number) => day(num * 7);

export const month = (num: number) => day(num * 30.436875); // average month

export const year = (num: number) => month(num * 12);
