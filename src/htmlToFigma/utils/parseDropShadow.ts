import { convertRgbaToFigmaRgba } from './convertRgbaToFigmaRgba'
import { convertValueToNum } from './convertValueToNum'

type ShadowObject = {
  colorRgba: { r: number; g: number; b: number; a?: number | undefined }
  offsetX: number | undefined
  offsetY: number | undefined
  radius: number | undefined
  spread: number | undefined
}

export function parseDropShadow(shadowString: string): ShadowObject[] {
  const shadowRegex =
    /rgba?\(\d+, \d+, \d+(, \d(\.\d+)?)?\) -?\d+px -?\d+px -?\d+px -?\d+px/g
  const matchShadows = shadowString.match(shadowRegex)

  if (!matchShadows) {
    throw new Error('No valid shadows found.')
  }

  return matchShadows.map((shadow) => {
    const parts = shadow.match(
      /(rgba?\(\d+, \d+, \d+(, \d(\.\d+)?)?\))|(-?\d+px)/g
    )
    if (!parts || parts.length !== 5) {
      throw new Error('Shadow parsing error.')
    }
    return {
      colorRgba: convertRgbaToFigmaRgba(parts[0]),
      offsetX: convertValueToNum(parts[1]),
      offsetY: convertValueToNum(parts[2]),
      radius: convertValueToNum(parts[3]),
      spread: convertValueToNum(parts[4]),
    }
  })
}
