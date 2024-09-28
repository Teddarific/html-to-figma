export function replaceCssVariables(
  cssPropertyValue: string,
  element: HTMLElement = document.documentElement
): string {
  // Regex to find all instances of CSS variables in the format var(--variable-name)
  const regex = /var\(--[^)]+\)/g
  let matches

  // Prepare a copy of the original CSS property value to modify
  let modifiedCssPropertyValue = cssPropertyValue

  // Get computed styles from the specified element
  const style = getComputedStyle(element)

  // Loop over all regex matches
  while ((matches = regex.exec(cssPropertyValue)) !== null) {
    for (const match of matches) {
      // Extract the variable name, removing 'var(' at the start and ')' at the end
      const variableName = match.slice(4, -1)

      // Get the actual value of the CSS variable
      const actualValue = style.getPropertyValue(variableName).trim()

      // Replace the variable in the string with its actual value
      modifiedCssPropertyValue = modifiedCssPropertyValue.replace(
        match,
        actualValue
      )
    }
  }

  return modifiedCssPropertyValue
}
