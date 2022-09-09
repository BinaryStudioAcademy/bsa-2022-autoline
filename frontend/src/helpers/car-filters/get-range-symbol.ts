export const getRangeSymbol = (rangeName: string): string => {
  switch (rangeName) {
    case 'year':
      return 'year ';
    case 'price':
      return '$ ';
    case 'enginePower':
      return 'hP ';
    case 'engineDisplacement':
      return 'L ';
    default:
      return '';
  }
};
