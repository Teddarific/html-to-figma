export function generateNodeChanges(data) {
  const nodeChanges: any[] = [
    {
      guid: { sessionID: 0, localID: 0 },
      phase: 'CREATED',
      type: 'DOCUMENT',
      name: 'Document',
      visible: true,
      opacity: 1,
      blendMode: 'PASS_THROUGH',
      transform: { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 },
      mask: false,
      maskType: 'ALPHA',
      strokeWeight: 0,
      strokeAlign: 'CENTER',
      strokeJoin: 'BEVEL',
      slideThemeMap: { entries: [] },
    },
    {
      guid: { sessionID: 0, localID: 1 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 0, localID: 0 }, position: '!' },
      type: 'CANVAS',
      name: 'Page 1',
      visible: true,
      opacity: 1,
      blendMode: 'PASS_THROUGH',
      transform: { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 },
      mask: false,
      maskType: 'ALPHA',
      backgroundOpacity: 1,
      strokeWeight: 0,
      strokeAlign: 'CENTER',
      strokeJoin: 'BEVEL',
      backgroundEnabled: true,
      exportBackgroundDisabled: false,
    },
  ]

  let localIdCounter = 2

  const handleNode = (
    node: any,
    parentGuid?: { sessionID: number; localID: number }
  ) => {
    const currentGuid: { sessionID: number; localID: number } = {
      sessionID: 0,
      localID: localIdCounter,
    }
    localIdCounter += 1

    if (node.type === 'FRAME') {
      const backgroundFill = node.backgroundFill
      if (
        backgroundFill &&
        backgroundFill.color &&
        backgroundFill.color.a === undefined
      ) {
        backgroundFill.color.a = 1
      }

      nodeChanges.push({
        guid: currentGuid,
        phase: 'CREATED',
        ...(parentGuid && {
          parentIndex: { guid: parentGuid, position: '!' },
        }),
        type: 'FRAME',
        name: node.name,
        visible: true,
        opacity: 1,
        size: { x: node.width, y: node.height },
        transform: { m00: 1, m01: 0, m02: node.x, m10: 0, m11: 1, m12: node.y },
        bottomLeftRadius: node.bottomLeftRadius,
        bottomRightRadius: node.bottomRightRadius,
        topLeftRadius: node.topLeftRadius,
        topRightRadius: node.topRightRadius,
        paddingTop: node.padding.top,
        paddingRight: node.padding.right,
        paddingBottom: node.padding.bottom,
        paddingLeft: node.padding.left,
        ...(backgroundFill && { fillPaints: [node.backgroundFill] }),
      })

      if (node.children) {
        node.children.forEach((child) => {
          handleNode(child, currentGuid)
        })
      }
    } else if (node.type === 'TEXT') {
      const backgroundFill = node.color
      if (
        backgroundFill &&
        backgroundFill.color &&
        backgroundFill.color.a === undefined
      ) {
        backgroundFill.color.a = 1
      }

      nodeChanges.push({
        guid: currentGuid,
        phase: 'CREATED',
        type: 'TEXT',
        autoRename: true,
        derivedTextData: {},
        fontSize: node.fontSize,
        fontName: {
          family: 'Inter',
          style: 'Bold',
          postscript: '',
        },
        name: node.characters,
        opacity: 1,
        ...(parentGuid && {
          parentIndex: { guid: parentGuid, position: '!' },
        }),
        textData: {
          characters: node.characters,
          lines: [
            {
              indentationLevel: 0,
              isFirstLineOfList: false,
              lineType: 'PLAIN',
              listStartOffset: 0,
              sourceDirectionality: 'AUTO',
              styleId: 0,
            },
          ],
        },
        size: { x: node.width, y: node.height },
        transform: { m00: 1, m01: 0, m02: node.x, m10: 0, m11: 1, m12: node.y },
        visible: true,
        ...(backgroundFill && { fillPaints: [backgroundFill] }),
      })
    }
  }

  handleNode(data, { sessionID: 0, localID: 1 })

  return nodeChanges
}
