const convertPrice = (rate: string, price: number): string => {
  return Math.round(Number(rate) * price)
    .toLocaleString('us-US', {
      style: 'currency',
      currency: 'UAH',
      maximumFractionDigits: 0,
    })
    .replace(/,/g, ' ');
};

export { convertPrice };
