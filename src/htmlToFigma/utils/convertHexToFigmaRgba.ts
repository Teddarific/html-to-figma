export function convertHexToFigmaRgba(hex: string) {
  if (hex.length !== 7 && hex.length !== 9) {
    throw new Error('Invalid hex color')
  }

  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  let rgb: any = { r, g, b }

  if (hex.length === 9) {
    const a = parseInt(hex.slice(7, 9), 16) / 255
    rgb = { r, g, b, a }
  }

  return rgb
}
