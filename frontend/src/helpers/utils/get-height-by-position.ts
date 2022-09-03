export const getHeightByPosition = (topPosition: number): number => {
  return window.scrollY < topPosition
    ? window.innerHeight - topPosition + window.scrollY
    : window.innerHeight;
};
