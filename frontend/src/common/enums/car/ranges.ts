const pricesRange = [
  5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000,
];

const yearsRange = (count: number): string[] => {
  const currentYear = new Date().getFullYear();
  return [...Array(count).keys()].map((i) => String(currentYear - i));
};

const enginePowerRange = [
  50, 100, 150, 180, 200, 250, 300, 350, 400, 450, 500, 600, 700,
];

const engineDisplacementRange = [
  '0.5',
  '1.0',
  '1.5',
  '2.0',
  '2.5',
  '3.0',
  '3.5',
  '4.0',
  '5.0',
  '6.0',
];

export { pricesRange, yearsRange, enginePowerRange, engineDisplacementRange };
