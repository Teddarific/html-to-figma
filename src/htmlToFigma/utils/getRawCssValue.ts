export function getRawCssValue(
  element: Element,
  cssProperty: string,
  stylesheetOverrides?: StyleSheetList
): string | null {
  // First, check for an inline style directly on the element.
  const inlineStyle = element.getAttribute('style')

  if (inlineStyle && inlineStyle.includes(cssProperty)) {
    const match = inlineStyle.match(
      new RegExp(`${cssProperty}\\s*:\\s*([^;]+);`)
    )
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  // Prepare to track the most specific applicable rule
  let highestSpecificityValue: string | null = null
  let highestSpecificity = 0

  // Function to calculate the specificity of a selector
  const calculateSpecificity = (selector: string): number => {
    let specificity = 0
    const idCount = (selector.match(/#/g) || []).length
    const classCount =
      (selector.match(/\./g) || []).length +
      (selector.match(/\[/g) || []).length +
      (selector.match(/:/g) || []).length
    const tagCount = selector.replace(/[#.:[\] +>~]/g, '').length
    specificity += idCount * 100
    specificity += classCount * 10
    specificity += tagCount
    return specificity
  }

  const styleSheetsToUse = stylesheetOverrides ?? document.styleSheets

  // Loop through all stylesheets
  for (let i = styleSheetsToUse.length - 1; i >= 0; i--) {
    // Iterate from last to first
    const sheet = styleSheetsToUse[i]
    try {
      const rules = sheet.rules || sheet.cssRules
      for (let j = rules.length - 1; j >= 0; j--) {
        // Iterate rules from last to first
        const rule = rules[j] as CSSStyleRule
        if (element.matches(rule.selectorText)) {
          const specificity = calculateSpecificity(rule.selectorText)
          if (specificity >= highestSpecificity) {
            const value = rule.style.getPropertyValue(cssProperty)
            if (value) {
              highestSpecificity = specificity
              highestSpecificityValue = value.trim()
            }
          }
        }
      }
    } catch (e) {
      console.error('Cannot read CSS rule: ', e)
    }
  }

  return highestSpecificityValue
}
