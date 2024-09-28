import {
  compileSchema,
  decodeBinarySchema,
  encodeBinarySchema,
} from 'kiwi-schema'
import { deflateRaw, inflateRaw } from 'pako'
import { base64ToArrayBuffer } from './utils/base64ToArrayBuffer'
import { Buffer } from 'buffer'
// @ts-expect-error Don't have typings
import { parse } from './opentype/opentype.mjs'
import { createCanvas } from 'canvas'
import { generateGlyphData } from './generateGlyphData'
import { decodeCommandBlob } from './decodeCommandBlob'
import { analyzeBytes } from './analyzeBytes'
import { encodeCommandBlobs } from './encodeCommandBlobs'
import { create, Font } from 'fontkit'
import InterFont from './fonts/Inter.ttf'
import { helloWorldEncoded } from './rawEncoded/helloWorld'
import { galileoPastedEncoded } from './rawEncoded/galileoPasted'
import { galileoRaw } from './rawEncoded/galileoRaw'
import { calculateDerivedTextData } from './calculateDerivedTextData'
import { generateNodeChanges } from './generateNodeChanges'
import { getStartedEncoded } from './rawEncoded/getStarted'

const FIG_KIWI_PRELUDE = 'fig-kiwi'
const FIG_KIWI_VERSION = 48

const FigmaArchiveWriter = class {
  files: any
  header: any

  constructor() {
    this.files = []
    this.header = { prelude: FIG_KIWI_PRELUDE, version: FIG_KIWI_VERSION }
  }
  write() {
    const headerSize = FIG_KIWI_PRELUDE.length + 4
    const totalSize = this.files.reduce(
      (sz: any, f: any) => sz + 4 + f.byteLength,
      headerSize
    )
    const buffer = new Uint8Array(totalSize)
    const view = new DataView(buffer.buffer)
    const enc = new TextEncoder()
    let offset = 0
    offset = enc.encodeInto(FIG_KIWI_PRELUDE, buffer).written
    view.setUint32(offset, this.header.version, true)
    offset += 4
    for (const file of this.files) {
      view.setUint32(offset, file.byteLength, true)
      offset += 4
      buffer.set(file, offset)
      offset += file.byteLength
    }
    return buffer
  }
}

const FigmaArchiveParser: any = class {
  offset: any
  buffer: any
  data: any

  constructor(buffer: any) {
    this.offset = 0
    this.buffer = buffer
    this.data = new DataView(buffer.buffer)
  }
  readUint32() {
    const n = this.data.getUint32(this.offset, true)
    this.offset += 4
    return n
  }
  read(bytes: any) {
    if (this.offset + bytes <= this.buffer.length) {
      const d = this.buffer.slice(this.offset, this.offset + bytes)
      this.offset += bytes
      return d
    } else {
      throw new Error(`read(${bytes}) is past end of data`)
    }
  }
  readHeader() {
    const preludeData = this.read(FIG_KIWI_PRELUDE.length)
    const prelude = String.fromCharCode.apply(String, preludeData)
    if (prelude != FIG_KIWI_PRELUDE) {
      throw new Error(`Unexpected prelude: "${prelude}"`)
    }
    const version = this.readUint32()
    return { prelude, version }
  }
  readData(size: any): any {
    return this.read(size)
  }
  readAll() {
    const header = this.readHeader()
    const files: any[] = []
    while (this.offset + 4 < this.buffer.length) {
      const size = this.readUint32()
      const data = this.readData(size)
      files.push(data)
    }
    return { header, files }
  }
  static parseArchive(data: any) {
    const parser = new FigmaArchiveParser(data)
    return parser.readAll()
  }
}

function composeHTMLString(data: any) {
  const strValue = ''
  const metaStr = Buffer.from(JSON.stringify(data.meta)).toString('base64')
  const figStr = Buffer.from(data.figma).toString('base64')
  return `<meta charset="utf-8" /><meta charset="utf-8" /><span
  data-metadata="<!--(figmeta)${metaStr}(/figmeta)-->"
></span
><span
  data-buffer="<!--(figma)${figStr}(/figma)-->"
></span
><span style="white-space: pre-wrap">${strValue}</span>`
}

function writeHTMLMessage(m: { meta: any; schema: any; message: any }) {
  const { meta, schema, message } = m
  const encoder = new FigmaArchiveWriter()
  const binSchema = encodeBinarySchema(schema)
  const compiledSchema = compileSchema(schema)
  encoder.files = [
    deflateRaw(binSchema),
    deflateRaw(compiledSchema.encodeMessage(message)),
  ]
  const data = encoder.write()
  return composeHTMLString({ meta, figma: data })
}

export async function figmaToClipboard(data: any) {
  console.log(data)

  const hardcodedTextData = data.children[0].children[0].children[0]

  // await calculateDerivedTextData({ textNode: hardcodedTextData })

  const fontResponse = await fetch(
    'https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff'
  )
  const fontBuffer = await fontResponse.arrayBuffer()
  const font = parse(fontBuffer)

  const fkFont = create(Buffer.from(fontBuffer)) as Font

  const fkGlyphs = fkFont.glyphsForString('Hello World')

  const layoutData = fkFont.layout('Hello World')

  const tg = layoutData.glyphs[0]
  const subset = fkFont.createSubset()

  // subset.includeGlyph(fkGlyphs[0])
  // console.log(subset.encode())

  const testGlyphf = fkGlyphs[0]

  const arrayBuffer = base64ToArrayBuffer(getStartedEncoded)

  const { header, files } = FigmaArchiveParser.parseArchive(arrayBuffer)

  const [schemaCompressed, dataCompressed] = files

  const schema = decodeBinarySchema(inflateRaw(schemaCompressed))
  // console.log(schema);

  const compiledSchema = compileSchema(schema)
  const output = compiledSchema.decodeMessage(inflateRaw(dataCompressed))

  let derivedTextData: any = undefined

  output.nodeChanges.forEach((n: any) => {
    if (n.type === 'TEXT') {
      derivedTextData = n.derivedTextData
    } else if (n.type === 'FRAME') {
      // console.log(n.fillPaints[0].color)
    }
  })

  const glyphData = generateGlyphData('Hello World', 30, 40)

  console.log(output)
  // console.log(glyphData)

  // console.log(derivedTextData.glyphs)

  // const glyphs = font.stringToGlyphs('Hello World')
  // console.log(glyphs)

  // derivedTextData.glyphs.forEach((g) => {
  //   g.commandsBlob = 0
  // })

  const textDecoder = new TextDecoder('utf-8')
  // console.log(new Blob(output.blobs[0]))
  const blobOne = output.blobs[0] as { bytes: Uint8Array }

  // console.log(blobOne)

  // analyzeBytes(output.blobs[2].bytes)

  // console.log(decodeCommandBlob(blobOne.bytes))

  // console.log(Buffer.from(blobOne.bytes).toString('base64'))

  // console.log(blobOne.bytes)

  // const path = font.charToGlyph(' ').getPath()
  // console.log(path)

  // const hPath = font.charToGlyph('H').getPath()
  // console.log(blobOne)
  // console.log(hPath.commands)

  // const ePath = font.charToGlyph('e').getPath()
  // console.log(output.blobs[1])
  // console.log(ePath)

  // const lPath = font.charToGlyph('l').getPath(0, 0, 30, undefined, font)
  // console.log(output.blobs[2])
  // console.log(lPath)

  const mockedString = 'Hello World'
  const mockedGlyphs = font.stringToGlyphs(mockedString)
  const mockedCommandBlobs = mockedGlyphs.map((glyph) => {
    const path = glyph.getPath(0, 0, 1)

    const pathData = path.toPathData({
      optimize: false,
      decimalPlaces: 8,
      flipY: true,
      flipYBase: 0.5,
    })
    // console.log(pathData)

    const commands = path.commands
    // console.log(commands)
    return encodeCommandBlobs({ pathData })
  })
  // const mockedCommandBlobs = layoutData.glyphs.map((glyph) => {
  //   const path = glyph.path

  //   const scaledPath = path.scale(0.0001)

  //   return encodeCommandBlobs({ pathData: scaledPath.toSVG() })
  // })

  // const path = mockedGlyphs[0].getPath()
  // encodeCommandBlobs({ commands: path.commands })

  // const hexString = Array.from(blobOne.bytes, (byte) =>
  //   byte.toString(16).padStart(2, '0')
  // ).join(' ')

  // 012345678910
  // Hello World
  const path = font.getPath('Hello World', 0, 0, 14)

  // console.log('-------')
  // console.log(output.blobs[3])
  // console.log(mockedCommandBlobs[4])

  const blobsToUse = [
    // output.blobs[0],
    mockedCommandBlobs[0], // h
    mockedCommandBlobs[1], // e
    mockedCommandBlobs[2], // l l      l
    mockedCommandBlobs[4], // o     o
    mockedCommandBlobs[5], // space
    mockedCommandBlobs[6], // w
    mockedCommandBlobs[8], // r
    mockedCommandBlobs[10], // d
  ]

  const generatedNodeChanges = await generateNodeChanges(data)

  console.log(blobsToUse)
  const hardcodedNodeChanges = [
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
    {
      guid: { sessionID: 152, localID: 499 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 0, localID: 1 }, position: '!' },
      type: 'FRAME',
      name: 'Container',
      visible: true,
      opacity: 1,
      size: { x: 428.0625, y: 1294 },
      transform: { m00: 1, m01: 0, m02: 33, m10: 0, m11: 1, m12: 33 },
      fillPaints: [
        {
          type: 'SOLID',
          color: {
            r: 1,
            g: 1,
            b: 1,
            a: 1,
          },

          opacity: 1,
          visible: true,
          blendMode: 'NORMAL',
        },
      ],
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
      topLeftRadius: 0,
      topRightRadius: 0,
    },
    {
      guid: { sessionID: 152, localID: 500 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 152, localID: 499 }, position: '!' },
      type: 'FRAME',
      name: 'Container',
      visible: true,
      opacity: 1,
      size: { x: 428.0625, y: 1294 },
      transform: { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 },
      fillPaints: [
        {
          type: 'SOLID',
          color: {
            r: 0.9529,
            g: 0.956,
            b: 0.964,
            a: 1,
          },

          opacity: 1,
          visible: true,
          blendMode: 'NORMAL',
        },
      ],
      bottomLeftRadius: 15,
      bottomRightRadius: 0,
      topLeftRadius: 16,
      topRightRadius: 0,
      paddingTop: 16,
      paddingBottom: 16,
      paddingRight: 24,
      paddingLeft: 24,
    },
    {
      guid: { sessionID: 152, localID: 501 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 152, localID: 500 }, position: '!' },
      type: 'FRAME',
      name: 'Section',
      visible: true,
      opacity: 1,
      size: { x: 380.0625, y: 84 },
      transform: { m00: 1, m01: 0, m02: 24, m10: 0, m11: 1, m12: 605 },
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
      topLeftRadius: 0,
      topRightRadius: 0,
    },
    {
      guid: { sessionID: 152, localID: 502 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 152, localID: 501 }, position: '!' },
      type: 'FRAME',
      name: 'HEADING',
      visible: true,
      opacity: 1,
      size: { x: 380.0625, y: 40 },
      transform: { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: 0 },
      bottomLeftRadius: 0,
      bottomRightRadius: 0,
      topLeftRadius: 0,
      topRightRadius: 0,
    },
    {
      guid: { sessionID: 152, localID: 503 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 152, localID: 502 }, position: '!' },
      type: 'TEXT',
      name: 'Heading',
      fontSize: 30.5999,
      fontName: { family: 'Inter', style: 'Bold', postscript: '' },
      lineHeight: { value: 40, units: 'PIXELS' },
      textData: {
        characters: 'Welcome to Storybook',
        lines: [
          {
            lineType: 'PLAIN',
            styleId: 0,
            indentationLevel: 0,
            sourceDirectionality: 'AUTO',
            listStartOffset: 0,
            isFirstLineOfList: false,
          },
        ],
      },
      derivedTextData: derivedTextData,
      visible: true,
      opacity: 1,
      size: { x: 380.0625, y: 43 },
      transform: { m00: 1, m01: 0, m02: 0, m10: 0, m11: 1, m12: -2 },
      strokeWeight: 1,
      fillPaints: [
        {
          type: 'SOLID',
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
          },

          opacity: 1,
          visible: true,
          blendMode: 'NORMAL',
        },
      ],
      textAlignHorizontal: 'CENTER',
      textAlignVertical: 'CENTER',
      textAutoResize: 'HEIGHT',
      autoRename: true,
    },
    {
      guid: { sessionID: 20000152, localID: 2 },
      phase: 'CREATED',
      parentIndex: { guid: { sessionID: 0, localID: 0 }, position: '"' },
      type: 'CANVAS',
      name: 'Internal Only Canvas',
      visible: false,
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
      internalOnly: true,
    },
  ]

  console.log(generatedNodeChanges)

  const writtenData = writeHTMLMessage({
    meta: {
      fileKey: 'whatever',
      pasteID: 777,
      dataType: 'scene',
    },
    schema,
    message: {
      type: 'NODE_CHANGES',
      sessionID: 0,
      ackID: 0,
      pasteID: 2027534134,
      pasteFileKey: '4ZmMaIx1bTgZZM4DTwZX2M',
      pasteIsPartiallyOutsideEnclosingFrame: false,
      pastePageId: { sessionID: 158, localID: 2 },
      isCut: false,
      pasteEditorType: 'DESIGN',
      publishedAssetGuids: [],
      // nodeChanges: [...output.nodeChanges],
      // nodeChanges: hardcodedNodeChanges,
      nodeChanges: generatedNodeChanges,
      // blobs: [...output.blobs],
      blobs: blobsToUse,
    },
  })
  const blob = new Blob([writtenData], { type: 'text/html' })
  const finalData = [new ClipboardItem({ 'text/html': blob })]
  await navigator.clipboard.write(finalData)
}
