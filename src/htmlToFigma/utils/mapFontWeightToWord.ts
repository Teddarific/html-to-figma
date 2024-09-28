import { mapFontFamilyToWord } from './mapFontFamilyToWord'

export function mapFontWeightToWord(weight: string, family?: string): string {
  if (weight === '100') {
    return 'Thin'
  } else if (weight === '200') {
    return 'Extra Light'
  } else if (weight === '300') {
    return 'Light'
  } else if (weight === '400') {
    return 'Regular'
  } else if (
    weight === '500' &&
    family &&
    mapFontFamilyToWord(family) === 'Open Sans'
  ) {
    return 'SemiBold'
  } else if (weight === '500') {
    return 'Medium'
  } else if (
    weight === '600' &&
    family &&
    mapFontFamilyToWord(family) === 'Open Sans'
  ) {
    return 'SemiBold'
  } else if (weight === '600') {
    return 'Semi Bold'
  } else if (weight === '700') {
    return 'Bold'
  } else if (weight === '800') {
    return 'Extra Bold'
  } else if (weight === '900') {
    return 'Black'
  }

  return weight
}
