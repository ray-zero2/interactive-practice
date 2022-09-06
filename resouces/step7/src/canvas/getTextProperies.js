
export const getTextProperties = (textElement) => {
  const { fontFamily, fontSize, fontWeight ,color, lineHeight, letterSpacing, textAlign } = window.getComputedStyle(textElement);
  return {
    text: textElement.innerText,
    fontFamily,
    fontSize,
    fontWeight,
    color,
    lineHeight,
    letterSpacing,
    textAlign
  }
}