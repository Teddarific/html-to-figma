interface Command {
  type: 'M' | 'L' | 'Z'
  x?: number
  y?: number
}

export function decodeCommandBlob(data: Uint8Array) {
  const commands: Command[] = []
  let index = 0

  function readByte(): number {
    return data[index++]
  }

  function readFloat(): number {
    const view = new DataView(data.buffer, index, 4)
    index += 4
    return view.getFloat32(0, true) // true for little-endian
  }

  while (index < data.length) {
    const type = readByte()

    if (type === 0) {
      const x = readFloat()
      const y = -readFloat() // Negate y to match expected output
      commands.push({ type: 'M', x, y })
    } else if (type === 1) {
      const x = readFloat()
      const y = -readFloat() // Negate y to match expected output
      commands.push({ type: 'L', x, y })
    } else if (type === 2) {
      commands.push({ type: 'Z' })
    } else {
      console.warn(`Unknown command type: ${type}`)
    }
  }

  return commands
}
