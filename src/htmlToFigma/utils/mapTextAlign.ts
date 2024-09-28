export function mapTextAlign(textAlign: string) {
  if (textAlign === 'start') {
    return 'LEFT'
  } else if (textAlign === 'end') {
    return 'RIGHT'
  }

  return textAlign.toUpperCase()
}
