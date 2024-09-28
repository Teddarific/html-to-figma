export function convertValueToNum(value: string): number | undefined {
  if (value === 'normal') {
    return 1.2
  }

  if (value.endsWith('px')) {
    return parseInt(value.slice(0, -2))
  } else if (value === 'auto') {
    return undefined
  } else if (value.endsWith('%')) {
    // HACK(teddy): This is a temporary patch to support border-radius: 50%
    return 1000
  } else if (value.startsWith('clamp')) {
    return undefined
  }

  throw new Error(`Unhandled value case: ${value}`)
  return 0
}
