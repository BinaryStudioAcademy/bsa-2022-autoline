const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

const arrToQueryString = (arr: string[], paramName: string): string => {
  if (arr && arr.length) {
    return arr.map((item) => `${paramName}=${item}`).join('&');
  }
  return '';
};

export { toCamelCase, arrToQueryString };
