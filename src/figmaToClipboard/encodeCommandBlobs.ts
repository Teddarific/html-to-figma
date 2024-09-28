type PathCommand = {
  type: string
  points: number[]
}

function parsePathData(pathData: string): PathCommand[] {
  const chars = pathData.split('')
  const commands: PathCommand[] = []

  let currentType = chars[0]
  let currentString = ''
  let currentPoints: number[] = []

  const handleCommand = () => {
    let points = [...currentPoints, parseFloat(currentString)]

    if (currentType === 'C') {
      points = [points[2], points[3], points[4], points[5]]
    }

    commands.push({ type: currentType, points })
    currentString = ''
    currentPoints = []
    currentType = ''
  }

  for (let i = 1; i < chars.length; i += 1) {
    const currentChar = chars[i]

    if (currentChar === 'M') {
      handleCommand()
      currentType = 'M'
    } else if (currentChar === 'C') {
      handleCommand()
      currentType = 'C'
    } else if (currentChar === 'L') {
      handleCommand()
      currentType = 'L'
    } else if (currentChar === 'Q') {
      handleCommand()
      currentType = 'Q'
    } else if (currentChar === ' ') {
      if (currentString) {
        currentPoints.push(parseFloat(currentString))
      }
      currentString = ''
    } else if (currentChar === '-') {
      if (currentString) {
        currentPoints.push(parseFloat(currentString))
      }
      currentString = '-'
    } else {
      currentString += currentChar
    }
  }

  if (currentString) {
    handleCommand()
  }

  return commands
}

const valueToBufferValues = (value: number) => {
  const buffer = new ArrayBuffer(4)
  const dataView = new DataView(buffer)
  dataView.setFloat32(0, value, true)

  return new Uint8Array(buffer)
}

export function encodeCommandBlobs({ pathData }: { pathData: string }) {
  const parsedPath = parsePathData(pathData)
  // console.log(pathData)
  // console.log(parsedPath)
  // console.log('-----')

  const arr: number[] = []

  // Init
  arr.push(0)

  parsedPath.forEach((data) => {
    if (data.type === 'M') {
      arr.push(1)
      data.points.forEach((pt) => {
        arr.push(...valueToBufferValues(pt))
      })
    } else if (data.type === 'C') {
      arr.push(3)
      data.points.forEach((pt) => {
        arr.push(...valueToBufferValues(pt))
      })
    } else if (data.type === 'L') {
      arr.push(2)
      data.points.forEach((pt) => {
        arr.push(...valueToBufferValues(pt))
      })
    }

    //   arr.push(...valueToBufferValues(command.x))
    //   arr.push(...valueToBufferValues(command.y))
    // } else if (command.type === 'C') {
    //   arr.push(3)
    //   arr.push(...valueToBufferValues(command.x1))
    //   arr.push(...valueToBufferValues(command.y1))
    //   arr.push(...valueToBufferValues(command.x2))
    //   arr.push(...valueToBufferValues(command.y2))
    // } else if (command.type === 'L') {
    //   arr.push(2)

    //   arr.push(...valueToBufferValues(command.x))
    //   arr.push(...valueToBufferValues(command.y))
    // }
  })

  if (arr.length > 1) {
    arr.push(0)
  }

  const numArr = [
    0, 1, 93, 116, 129, 61, 0, 0, 0, 0, 2, 93, 116, 129, 61, 140, 46, 58, 63, 2,
    140, 46, 94, 62, 140, 46, 58, 63, 2, 140, 46, 94, 62, 47, 186, 218, 62, 2,
    93, 116, 7, 63, 47, 186, 218, 62, 2, 93, 116, 7, 63, 140, 46, 58, 63, 2, 47,
    186, 46, 63, 140, 46, 58, 63, 2, 47, 186, 46, 63, 0, 0, 0, 0, 2, 93, 116, 7,
    63, 0, 0, 0, 0, 2, 93, 116, 7, 63, 117, 209, 153, 62, 2, 140, 46, 94, 62,
    117, 209, 153, 62, 2, 140, 46, 94, 62, 0, 0, 0, 0, 2, 93, 116, 129, 61, 0,
    0, 0, 0, 0,
  ]
  // console.log('-----')
  // console.log(arr)
  // console.log('-----')

  // return { bytes: new Uint8Array(numArr) }

  return { bytes: new Uint8Array(arr) }
}
