const formatPrice = (num: number): string => {
  return num
    .toLocaleString('us-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
    .replace(/,/g, ' ');
};

export { formatPrice };
