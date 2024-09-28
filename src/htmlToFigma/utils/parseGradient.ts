import { convertRgbaToFigmaRgba } from './convertRgbaToFigmaRgba'

type GradientStop = {
  color: { r: number; g: number; b: number; a: number }
  position: number
}

type GradientTransform = [number, number, number][]

interface GradientObject {
  gradientStops: GradientStop[]
  gradientTransform: GradientTransform
}

function directionToAngle(direction: string): number | undefined {
  const mapping: { [key: string]: number } = {
    'to top': 270, // correct with translation - a 270-degree angle points upward in a standard system, which maps to top in Figma.
    'to right': 0, // correct - 0 degrees points to the right.
    'to bottom': 90, // correct - 90 degrees points downward.
    'to left': 180, // correct with translation - 180 degrees points to the left.
    'to top right': 315, //  correct with 0.5 translation
    'to right top': 315, // ??? idk how to do this in css
    'to bottom right': 45, //  correct with 0.5 translation
    'to right bottom': 45, // ??? idk how to do this in css
    'to bottom left': 135, // correct with -0.5 translation
    'to left bottom': 135, // ??? idk how to do this in css
    'to top left': 225, // correct with 1.5 translation
    'to left top': 225, // ??? idk how to do this in css
  }

  const normalizedDirection: string = direction
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

  if (mapping[normalizedDirection] === undefined) {
    /* sometimes, no direction is present.
     * because with linear-gradient
     * If unspecified, it defaults to to bottom. */
    return mapping['to bottom']
  }

  return mapping[normalizedDirection]
}

// This is invalid in Figma
// "gradientTransform": [
//   [null, null, 0],
//   [null, null, 0]
function angleToGradientTransform(
  angle: number | undefined
): GradientTransform {
  if (typeof angle !== 'number' || isNaN(angle)) {
    console.error('Invalid input: angle must be a valid number.')
    return [
      [1, 0, 0],
      [0, 1, 0],
    ]
  }

  const radians = (angle * Math.PI) / 180 // Convert angle from degrees to radians
  const cosTheta = Math.cos(radians)
  const sinTheta = Math.sin(radians)

  // Initialize translations to zero
  const x_translation = 0
  let y_translation = 0

  // https://forum.figma.com/t/need-help-with-gradienttranform-matrix/26792/2
  // The gradientTransform matrix is multiplied by another matrix to normalize the coordinate space to be [0…1, 0…1].
  // A simple way to do this is to multiply by the inverse of the gradientTransform. This has the side-effect of inversing the scale factor.
  // However, it makes it easy to place the gradient handles and convert them back and forth from that to a transform for editing purposes.
  switch (angle) {
    case 270: // to top
      y_translation = 1 // Move the gradient down to start from the bottom
      break
    case 180: // to left
      y_translation = 1
      break
    case 315:
      y_translation = 0.5
      break
    case 45:
      y_translation = 0.5
      break
    case 135:
      y_translation = -0.5
      break
    case 225:
      y_translation = 1.5
      break
  }

  // Applying a transformation that accounts for translations
  const transform: GradientTransform = [
    [cosTheta, sinTheta, -sinTheta * y_translation], // Apply translations
    [-sinTheta, cosTheta, cosTheta * x_translation], // Adjusting coordinates
  ]

  return transform
}

export function parseGradient(cssGradient: string): GradientObject {
  const gradientDefinitions = cssGradient.substring(
    cssGradient.indexOf('(') + 1,
    cssGradient.lastIndexOf(')')
  )

  // Finally with regex we can get each parts separately
  const gradientParts: string[] = gradientDefinitions.split(
    /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/
  )

  const direction = gradientParts[0].trim()
  const angle = directionToAngle(direction)

  const gradientTransform = angleToGradientTransform(angle)

  let stops
  // because gradientParts might have unspecific direction, in which case
  // no need to slice
  if (gradientParts.length > 2) {
    stops = gradientParts.slice(1).map((stop) => {
      return stop.trim()
    })
  } else {
    stops = gradientParts.map((stop) => {
      return stop.trim()
    })
  }

  const gradientStops: GradientStop[] = stops.map((stop, index) => {
    const rgba = { ...convertRgbaToFigmaRgba(stop), a: 1 }

    return {
      color: rgba,
      position: index / (stops.length - 1), // this can't be greater than 1, because it's a percentage. so convert index to percentage
    }
  })

  return {
    gradientStops,
    gradientTransform,
  }
}
