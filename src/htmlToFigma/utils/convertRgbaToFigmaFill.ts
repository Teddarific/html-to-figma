import { convertRgbaToFigmaRgba } from './convertRgbaToFigmaRgba'

export function convertRgbaToFigmaFill(rgba: string) {
  const { a, ...figmaRgb } = convertRgbaToFigmaRgba(rgba)

  return {
    blendMode: 'NORMAL',
    type: 'SOLID',
    color: figmaRgb,
    boundVariables: {},
    opacity: a !== undefined ? a : 1,
    visible: true,
  } as const
}
