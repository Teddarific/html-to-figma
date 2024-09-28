import { encodeCommandBlobs } from './encodeCommandBlobs'
// @ts-expect-error Don't have typings
import { parse } from './opentype/opentype.mjs'

const FONT_SCALE_FACTOR = 20

export async function calculateDerivedTextData({
  textNode,
}: {
  textNode: any
}) {
  console.log(textNode)

  const fontResponse = await fetch(
    'https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff'
  )
  const fontBuffer = await fontResponse.arrayBuffer()
  const font = parse(fontBuffer)

  const fontSizeToUse = textNode.fontSize / FONT_SCALE_FACTOR

  const opentypeGlyphs = font.stringToGlyphs(textNode.characters)

  // Go through each character
  textNode.characters.split('').map((char, index) => {
    const advanceWidth = font.getAdvanceWidth(char, fontSizeToUse)

    return {
      commandBlob: 0,
      advance: advanceWidth,
      fontSize: textNode.fontSize,
      firstCharacter: index,
      position: {
        x: 0,
        y: 0,
      },
    }
  })

  const mockedCommandBlobs = opentypeGlyphs.map((glyph, index) => {
    console.log(glyph)

    console.log(
      font.getAdvanceWidth(
        textNode.characters.substring(index, index + 1),
        fontSizeToUse
      )
    )
    const path = glyph.getPath(0, 0, fontSizeToUse)

    const pathData = path.toPathData({
      optimize: false,
      decimalPlaces: 8,
      flipY: true,
      flipYBase: 0.5,
    })
    // console.log(pathData)

    const commands = path.commands
    // console.log(commands)
    return encodeCommandBlobs({ pathData })
  })

  return {
    layoutSize: {
      x: textNode.width,
      y: textNode.height,
    },
    glyphs: [],
  }
}
