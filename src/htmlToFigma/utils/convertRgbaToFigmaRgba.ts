export function convertRgbaToFigmaRgba(colorString: string): {
  r: number
  g: number
  b: number
  a?: number
} {
  // Regular expression to extract numbers from the RGB or RGBA string
  const numbers = colorString.match(/\d+\.?\d*/g)
  if (!numbers || numbers.length < 3) {
    throw new Error('Invalid color format')
  }

  // Parse RGB values and scale them to 0-1
  const r = parseInt(numbers[0]) / 255
  const g = parseInt(numbers[1]) / 255
  const b = parseInt(numbers[2]) / 255

  // Check if alpha value is provided and use it directly if present
  // 1 as the default
  const a = numbers.length === 4 ? parseFloat(numbers[3]) : 1

  return { r, g, b, a }
}
