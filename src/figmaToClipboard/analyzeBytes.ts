export function analyzeBytes(data: Uint8Array, bytesToAnalyze = 32) {
  if (data.length < 6) {
    throw new Error('Input Uint8Array must have at least 6 bytes')
  }

  // 1. Strip the first byte (we simply ignore it in this implementation)

  // 2. Convert the second byte to 1 or 2
  const secondByte = data[1] === 1 ? 1 : 2 // 49 is ASCII for '1', anything else becomes 2

  // 3. Convert the next four bytes into a float integer
  const floatBytes = data.slice(2, 6)
  const floatBuffer = new ArrayBuffer(4)
  const floatView = new Uint8Array(floatBuffer)
  floatView.set(floatBytes)
  const floatValue = new DataView(data.buffer).getFloat32(2, true) // true for little-endian

  console.log(secondByte)
  console.log(floatValue)
}
