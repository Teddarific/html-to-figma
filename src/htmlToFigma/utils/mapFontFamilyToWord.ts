export function mapFontFamilyToWord(family: string): string {
  if (
    family ===
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  ) {
    return 'Ubuntu Mono'
  } else if (family === '"Open Sans"') {
    return 'Open Sans'
  }

  return family.replace(/"/g, '')
}
