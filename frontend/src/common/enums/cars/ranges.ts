const pricesRange = [
  5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000,
];

const yearsRange = (count: number): string[] => {
  const currentYear = new Date().getFullYear();
  return [...Array(count).keys()].map((i) => String(currentYear - i));
};

const raceRange = [
  1000, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000,
];

export { pricesRange, yearsRange, raceRange };
