export const getElementHeightWithMargins = (
  element: Element | null,
): number => {
  if (!element) return 0;

  let elementHeight = element?.clientHeight || 0;
  elementHeight +=
    parseInt(window.getComputedStyle(element).getPropertyValue('margin-top')) ||
    0;
  elementHeight +=
    parseInt(
      window.getComputedStyle(element).getPropertyValue('margin-bottom'),
    ) || 0;

  return elementHeight;
};
