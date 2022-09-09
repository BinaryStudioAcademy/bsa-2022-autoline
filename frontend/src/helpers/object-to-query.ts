export const objectToQueryString = (filters: {
  [p: string]: string | string[] | Record<string, string | string[]>[];
}): string[][] => {
  const notEmpties = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) =>
        value.length >= 1 &&
        value !== '' &&
        Array.isArray(value) &&
        value[0] !== '',
    ),
  );

  return Object.entries(notEmpties).flatMap(([key, value]) => {
    if (typeof value === 'string') {
      return [[key, value]];
    }
    if (
      Array.isArray(value) &&
      (value as []).every((item) => typeof item === 'object')
    ) {
      return objectsArrayToQuery(
        key,
        value as {
          [p: string]: string | string[];
        }[],
      );
    }

    return value.map((item) => [key, item as string]);
  });
};

export const objectsArrayToQuery = (
  objectKey: string,
  arrayValue: {
    [p: string]: string | string[];
  }[],
): string[][] => {
  return arrayValue.flatMap((objectValue, index) => {
    const details: string[][] = [];
    Object.entries(objectValue).forEach(([valueKey, value]) => {
      if (!value) return;
      const key = `${objectKey}[${index}][${valueKey}]`;
      if (typeof value === 'string') {
        details.push([key, value]);
      }
      if (Array.isArray(value)) value.map((item) => details.push([key, item]));
    });
    return details;
  });
};
