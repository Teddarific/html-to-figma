export function getElementOffset(el: Element) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  }
}
