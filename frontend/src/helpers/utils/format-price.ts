const formatPrice = (num: number): string =>
  num
    .toLocaleString('us-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    .replace(/,/g, ' ');

export { formatPrice };
