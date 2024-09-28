import { createCanvas } from 'canvas'

interface GlyphData {
  advance: number
  commandsBlob: number
  firstCharacter: number
  fontSize: number
  position: {
    x: number
    y: number
  }
}

export function generateGlyphData(
  text: string,
  fontSize: number,
  lineHeight: number
): GlyphData[] {
  const canvas = createCanvas(800, 600) // Create a canvas
  const context = canvas.getContext('2d')
  context.font = `${fontSize}px Arial` // Set the font

  const glyphs: GlyphData[] = []
  let x = 0 // Initial x position
  let y = lineHeight // Initial y position

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const metrics = context.measureText(char) // Measure the text

    const advance = metrics.width / fontSize // Normalize advance width

    glyphs.push({
      advance: advance,
      commandsBlob: i, // Just using index as an example
      firstCharacter: i,
      fontSize: fontSize,
      position: { x, y },
    })

    x += metrics.width // Increment x position by the advance width

    // Handle line breaks (e.g., if there's a newline character or if x exceeds the canvas width)
    if (char === '\n' || x > canvas.width) {
      x = 0 // Reset x position
      y += lineHeight // Move to the next line
    }
  }

  return glyphs
}
