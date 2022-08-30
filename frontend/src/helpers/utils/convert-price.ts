const convertPrice = (rate: string, price: number): number => {
  return Math.round(Number(rate) * price);
};

export { convertPrice };
