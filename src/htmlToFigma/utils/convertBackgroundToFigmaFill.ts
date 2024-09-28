import { convertHexToFigmaRgba } from './convertHexToFigmaRgba'
import { convertRgbaToFigmaRgba } from './convertRgbaToFigmaRgba'
import { parseGradient } from './parseGradient'

export function convertBackgroundToFigmaFill(background: string) {
  if (background.startsWith('#')) {
    const figmaRgba = convertHexToFigmaRgba(background)

    const opacityToUse = figmaRgba.a ? figmaRgba.a : 1
    delete figmaRgba.a

    return {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: figmaRgba,
      boundVariables: {},
      opacity: opacityToUse,
      visible: true,
    } as const
  } else if (background.startsWith('rgb')) {
    const figmaRgba = convertRgbaToFigmaRgba(background)

    const opacityToUse = figmaRgba.a !== undefined ? figmaRgba.a : 1
    delete figmaRgba.a

    return {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: figmaRgba,
      boundVariables: {},
      opacity: opacityToUse,
      visible: true,
    } as const
  } else if (background.includes('gradient')) {
    const gradientInfo = parseGradient(background);

    return {
      blendMode: 'NORMAL',
      type: 'GRADIENT_LINEAR',
      gradientStops: gradientInfo.gradientStops,
      gradientTransform: gradientInfo.gradientTransform,
      opacity: 1,
      visible: true,
    } as const
    
  } else if (background === 'transparent') {
    return {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: { r: 1, g: 1, b: 1 },
      boundVariables: {},
      opacity: 0,
      visible: true,
    } as const
  }
}
