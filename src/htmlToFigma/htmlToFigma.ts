import { convertBackgroundToFigmaFill } from './utils/convertBackgroundToFigmaFill'
import { mapFontWeightToWord } from './utils/mapFontWeightToWord'
import { mapFontFamilyToWord } from './utils/mapFontFamilyToWord'
import { convertRgbaToFigmaFill } from './utils/convertRgbaToFigmaFill'
import { convertRgbaToFigmaRgba } from './utils/convertRgbaToFigmaRgba'
import { convertValueToNum } from './utils/convertValueToNum'
import { getElementOffset } from './utils/getElementOffset'
import { getRawCssValue } from './utils/getRawCssValue'
import { parseDropShadow } from './utils/parseDropShadow'
import { mapTextAlign } from './utils/mapTextAlign'
import { cleanOutput } from './utils/cleanOutput'

export function htmlToFigma(
  rootElement: Element,
  styleSheetOverrides?: StyleSheetList
) {
  const output = handleChildNode(rootElement, undefined, styleSheetOverrides)

  // console.log('flattening....')
  // flattenInlineTextNodes(output)
  // console.log('finished flattening')

  // Clean output
  cleanOutput(output)

  return output
}

const handleChildNode = (
  node: ChildNode,
  parent?: Element,
  styleSheetOverrides?: StyleSheetList
): any => {
  if (node.nodeType === 1) {
    const eleNode = node as Element

    const computedStyles = getComputedStyle(eleNode)

    if (
      computedStyles.display === 'none' ||
      computedStyles.visibility === 'hidden'
    ) {
      return
    }

    const { left, top } = getElementOffset(eleNode)
    const tagName = eleNode.tagName.toUpperCase()

    let parentOffset = {
      left: 0,
      top: 0,
    }
    if (parent) {
      parentOffset = getElementOffset(parent)
    }

    if (tagName === 'SVG') {
      // we skip path, circle, line... all we care about is top level svg html
      const { left, top } = getElementOffset(eleNode)

      let parentOffset = {
        left: 0,
        top: 0,
      }
      if (parent) {
        parentOffset = getElementOffset(parent)
      }

      const width = eleNode.getBoundingClientRect().width
      const height = eleNode.getBoundingClientRect().height

      const strokeWeight = convertValueToNum(computedStyles.strokeWidth)

      return {
        type: 'SVG',
        svg: eleNode.outerHTML,
        x: left - parentOffset.left,
        y: top - parentOffset.top,
        width,
        height,
        strokeWeight,
        strokes: [convertRgbaToFigmaFill(computedStyles.color)],
        metadata: {
          display: computedStyles.display,
          node,
        },
      }
    }

    let name = 'Container'
    if (tagName === 'INPUT') {
      name = 'Input'
    } else if (tagName === 'BUTTON') {
      name = 'Button'
    } else if (
      tagName === 'H1' ||
      tagName === 'H2' ||
      tagName === 'H3' ||
      tagName === 'H4' ||
      tagName === 'H5' ||
      tagName === 'H6'
    ) {
      name = 'Heading'
    } else if (tagName === 'P') {
      name = 'Paragraph'
    } else if (tagName === 'LABEL') {
      name = 'Label'
    } else if (tagName === 'SECTION') {
      name = 'Section'
    } else if (tagName === 'FORM') {
      name = 'Form'
    } else if (tagName === 'IMG') {
      name = 'Image'
    } else if (tagName === 'SPAN') {
      name = 'Span'
    } else if (tagName === 'SELECT') {
      name = 'Select'
    }

    const x = left - parentOffset.left
    const y = top - parentOffset.top
    const width = eleNode.getBoundingClientRect().width
    const height = eleNode.getBoundingClientRect().height

    const childNodes = []
    for (const c of eleNode.childNodes) {
      const newChildNodes = handleChildNode(c, eleNode)

      if (Array.isArray(newChildNodes)) {
        childNodes.push(...newChildNodes)
      } else {
        childNodes.push(newChildNodes)
      }
    }

    let additionalLayoutStyles: any = {}
    if (tagName === 'INPUT') {
      const inputType = eleNode.getAttribute('type')

      if (inputType === 'radio') {
        const isChecked = (eleNode as HTMLInputElement).checked

        const inputHighlightRgb = 'rgb(0,117,255)'
        const inputGrayRgb = 'rgb(118,118,118)'

        return {
          name: 'Radio Input',
          type: 'FRAME',
          x,
          y,
          width,
          height,
          topLeftRadius: 100,
          topRightRadius: 100,
          bottomLeftRadius: 100,
          bottomRightRadius: 100,
          strokes: [
            convertRgbaToFigmaFill(
              isChecked ? inputHighlightRgb : inputGrayRgb
            ),
          ],
          strokeTopWeight: 1,
          strokeBottomWeight: 1,
          strokeLeftWeight: 1,
          strokeRightWeight: 1,
          layoutMode: 'HORIZONTAL',
          layoutSizingHorizontal: 'FIXED',
          layoutSizingVertical: 'FIXED',
          counterAxisAlignItems: 'CENTER',
          primaryAxisAlignItems: 'CENTER',
          padding: {
            right: 2,
            left: 2,
            top: 2,
            bottom: 2,
          },
          ...(isChecked && {
            children: [
              {
                type: 'FRAME',
                name: 'Radio Checked',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'FILL',
                backgroundFill: convertRgbaToFigmaFill(inputHighlightRgb),
                topLeftRadius: 100,
                topRightRadius: 100,
                bottomLeftRadius: 100,
                bottomRightRadius: 100,
              },
            ],
          }),
          metadata: {
            display: 'block',
            node,
          },
        }
      } else if (inputType === 'checkbox') {
        const isChecked = (node as HTMLInputElement).checked

        const inputHighlightRgb = 'rgb(0,117,255)'
        const inputGrayRgb = 'rgb(118,118,118)'

        return {
          name: 'Radio Input',
          type: 'FRAME',
          x,
          y,
          width,
          height,
          topLeftRadius: 2,
          topRightRadius: 2,
          bottomLeftRadius: 2,
          bottomRightRadius: 2,
          strokes: [
            convertRgbaToFigmaFill(
              isChecked ? inputHighlightRgb : inputGrayRgb
            ),
          ],
          strokeTopWeight: 1,
          strokeBottomWeight: 1,
          strokeLeftWeight: 1,
          strokeRightWeight: 1,
          layoutMode: 'HORIZONTAL',
          layoutSizingHorizontal: 'FIXED',
          layoutSizingVertical: 'FIXED',
          counterAxisAlignItems: 'CENTER',
          primaryAxisAlignItems: 'CENTER',
          padding: {
            right: 2,
            left: 2,
            top: 2,
            bottom: 2,
          },
          backgroundFill: convertRgbaToFigmaFill(
            isChecked ? inputHighlightRgb : 'rgb(255,255,255)'
          ),
          ...(isChecked && {
            children: [
              {
                type: 'SVG',
                svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>`,
                x: 1,
                y: 1,
                width: width - 2,
                height: height - 2,
                strokeWeight: 1,
                strokes: [convertRgbaToFigmaFill('rgb(255,255,255)')],
              },
            ],
          }),
          metadata: {
            display: 'block',
            node,
          },
        }
      }

      const inputEle = node as HTMLInputElement
      additionalLayoutStyles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FIXED',
        counterAxisAlignItems: 'CENTER',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
      }

      if (inputEle.value) {
        childNodes.push({
          name: 'Input Value',
          type: 'TEXT',
          characters: inputEle.value || '',
          fontSize: convertValueToNum(computedStyles.fontSize),
          lineHeight: {
            unit: 'PIXELS',
            value: convertValueToNum(computedStyles.lineHeight),
          },
          color: convertRgbaToFigmaFill(computedStyles.color),
          fontWeight: mapFontWeightToWord(
            computedStyles.fontWeight,
            computedStyles.fontFamily
          ),
        })
      } else if (eleNode.getAttribute('placeholder')) {
        // const placeholderStyles = getComputedStyle(inputEle, '::placeholder')
        childNodes.push({
          name: 'Input Placeholder',
          type: 'TEXT',
          characters: eleNode.getAttribute('placeholder'),
          fontSize: convertValueToNum(computedStyles.fontSize),
          fontWeight: mapFontWeightToWord(
            computedStyles.fontWeight,
            computedStyles.fontFamily
          ),
          lineHeight: {
            unit: 'PIXELS',
            value: convertValueToNum(computedStyles.lineHeight),
          },
          color: {
            blendMode: 'NORMAL',
            type: 'SOLID',
            color: {
              r: 0.8,
              g: 0.8,
              b: 0.8,
            },
            boundVariables: {},
            opacity: 1,
            visible: true,
          } as const,
        })
      } else if (inputType === 'date') {
        childNodes.push({
          name: 'Date Placeholder',
          type: 'TEXT',
          characters: 'mm/dd/yyyy',
          fontSize: convertValueToNum(computedStyles.fontSize),
          fontWeight: mapFontWeightToWord(
            computedStyles.fontWeight,
            computedStyles.fontFamily
          ),
          lineHeight: {
            unit: 'PIXELS',
            value: convertValueToNum(computedStyles.lineHeight),
          },
          color: convertRgbaToFigmaFill(computedStyles.color),
        })
      }

      if (inputType === 'date') {
        childNodes.push({
          type: 'SVG',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="141" height="146">
<path d="M13.3,126.4V37.4c0-2.4,.9-4.5,2.6-6.3c1.7-1.8,3.8-2.6
6.2-2.6h8.8v-6.7c0-3.1,1.1-5.7,3.2-7.9c2.2-2.2,4.7-3.3,7.8-3.3h4.4c3,0
5.6,1.1,7.8,3.3c2.2,2.2,3.2,4.8,3.2,7.9v6.7h26.4v-6.7c0-3.1,1.1-5.7
3.2-7.9c2.2-2.2,4.7-3.3,7.8-3.3h4.4c3,0,5.6,1.1,7.8,3.3c2.2,2.2,3.2
4.8,3.2,7.9v6.7h8.8c2.4,0,4.4,.9,6.2,2.6c1.7,1.8,2.6,3.8,2.6,6.3v88.9c0
2.4-.9,4.5-2.6,6.3c-1.7,1.8-3.8,2.6-6.2,2.6H22.1c-2.4,0-4.4-.9-6.2-2.6C14.2,130.8
13.3,128.8,13.3,126.4z M22.1,126.4h96.8V55.2H22.1V126.4z M39.7,41.9c0,.6,.2,1.2
.6,1.6c.4,.4,.9,.6,1.6,.6h4.4c.6,0,1.2-.2,1.6-.6c.4-.4
.6-.9,.6-1.6v-20c0-.6-.2-1.2-.6-1.6c-.4-.4-.9-.6-1.6-.6h-4.4c-.6,0-1.2,.2-1.6
.6c-.4,.4-.6,1-.6,1.6V41.9z
M92.5,41.9c0,.6,.2,1.2,.6,1.6c.4,.4,.9,.6
1.6,.6h4.4c.6,0,1.2-.2,1.6-.6c.4-.4
.6-.9,.6-1.6v-20c0-.6-.2-1.2-.6-1.6c-.4-.4-.9-.6-1.6-.6h-4.4c-.6
0-1.2,.2-1.6,.6c-.4,.4-.6,1-.6,1.6V41.9z"/>
</svg>`,
          width: convertValueToNum(computedStyles.fontSize),
          height: convertValueToNum(computedStyles.fontSize),
          strokeWeight: 1,
          strokes: [convertRgbaToFigmaFill(computedStyles.color)],
        })
      }

      if (childNodes.length === 1) {
        additionalLayoutStyles.primaryAxisAlignItems = 'MIN'
      }
    }

    if (tagName === 'TEXTAREA') {
      const textareaEle = node as HTMLTextAreaElement
      additionalLayoutStyles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FIXED',
      }

      if (textareaEle.value) {
        childNodes.push({
          name: 'Textarea Value',
          type: 'TEXT',
          characters: textareaEle.value || '',
          fontSize: convertValueToNum(computedStyles.fontSize),
          lineHeight: {
            unit: 'PIXELS',
            value: convertValueToNum(computedStyles.lineHeight),
          },
          color: convertRgbaToFigmaFill(computedStyles.color),
          fontWeight: mapFontWeightToWord(
            computedStyles.fontWeight,
            computedStyles.fontFamily
          ),
          x: 0,
          y: 0,
          width: textareaEle.getBoundingClientRect().width,
          height: textareaEle.getBoundingClientRect().height,
        })
      } else if (textareaEle.placeholder) {
        childNodes.push({
          name: 'Textarea Placeholder',
          type: 'TEXT',
          characters: textareaEle.placeholder,
          fontSize: convertValueToNum(computedStyles.fontSize),
          fontWeight: mapFontWeightToWord(
            computedStyles.fontWeight,
            computedStyles.fontFamily
          ),
          lineHeight: {
            unit: 'PIXELS',
            value: convertValueToNum(computedStyles.lineHeight),
          },
          color: {
            blendMode: 'NORMAL',
            type: 'SOLID',
            color: {
              r: 0.8,
              g: 0.8,
              b: 0.8,
            },
            boundVariables: {},
            opacity: 1,
            visible: true,
          } as const,
          x: 0,
          y: 0,
          width: textareaEle.getBoundingClientRect().width,
          height: textareaEle.getBoundingClientRect().height,
        })
      }
    }

    if (tagName === 'SELECT') {
      const selectEle = node as HTMLSelectElement
      additionalLayoutStyles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FIXED',
        counterAxisAlignItems: 'CENTER',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
      }

      const selectedValue =
        selectEle.selectedIndex >= 0
          ? selectEle.options[selectEle.selectedIndex].text
          : ''

      childNodes.push({
        name: 'Select Value',
        type: 'TEXT',
        characters: selectedValue,
        fontSize: convertValueToNum(computedStyles.fontSize),
        lineHeight: {
          unit: 'PIXELS',
          value: convertValueToNum(computedStyles.lineHeight),
        },
        color: convertRgbaToFigmaFill(computedStyles.color),
        fontWeight: mapFontWeightToWord(
          computedStyles.fontWeight,
          computedStyles.fontFamily
        ),
      })

      childNodes.push({
        type: 'SVG',
        svg: `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#000000"/>
</svg>`,
        width: convertValueToNum(computedStyles.fontSize),
        height: convertValueToNum(computedStyles.fontSize),
        strokeWeight: 1,
        strokes: [convertRgbaToFigmaFill(computedStyles.color)],
      })
    }

    const backgroundColorCssValue = getRawCssValue(
      eleNode,
      'background-color',
      styleSheetOverrides
    )
    const backgroundImageCssValue = getRawCssValue(
      eleNode,
      'background-image',
      styleSheetOverrides
    )
    const backgroundCssValue = getRawCssValue(
      eleNode,
      'background',
      styleSheetOverrides
    )
    let backgroundFill: any | undefined = undefined
    let imageUrl: string | null = null

    if (backgroundColorCssValue) {
      backgroundFill = convertBackgroundToFigmaFill(
        computedStyles.backgroundColor
      )
    } else if (backgroundImageCssValue) {
      backgroundFill = convertBackgroundToFigmaFill(
        computedStyles.backgroundImage
      )
    } else if (backgroundCssValue) {
      backgroundFill = convertBackgroundToFigmaFill(computedStyles.background)
    } else if (!parent || tagName === 'INPUT') {
      const figmaRgba = convertRgbaToFigmaRgba(computedStyles.backgroundColor)
      let colorToUse: any = { r: 1, g: 1, b: 1 }

      if (figmaRgba.a && figmaRgba.a !== 0) {
        colorToUse = { ...figmaRgba, a: undefined }
      }

      backgroundFill = {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: colorToUse,
        boundVariables: {},
        opacity: 1,
        visible: true,
      } as const
    } else if (tagName === 'IMG') {
      imageUrl = eleNode.getAttribute('src')
      if (!imageUrl) {
        backgroundFill = {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0.2,
            g: 0.2,
            b: 0.2,
          },
          boundVariables: {},
          opacity: 1,
          visible: true,
        } as const
      }
    }

    // Since stroke goes on inside in Figma, we need to add border width to padding
    let adjustedPadding = 0

    let strokeStyles = {}
    if (
      computedStyles.borderWidth !== '0px' ||
      computedStyles.borderTopWidth !== '0px' ||
      computedStyles.borderBottomWidth !== '0px' ||
      computedStyles.borderLeftWidth !== '0px' ||
      computedStyles.borderRightWidth !== '0px'
    ) {
      strokeStyles = {
        strokes: [convertRgbaToFigmaFill(computedStyles.borderColor)],
        strokeTopWeight: convertValueToNum(computedStyles.borderTopWidth),
        strokeBottomWeight: convertValueToNum(computedStyles.borderBottomWidth),
        strokeLeftWeight: convertValueToNum(computedStyles.borderLeftWidth),
        strokeRightWeight: convertValueToNum(computedStyles.borderRightWidth),
      }

      adjustedPadding += convertValueToNum(computedStyles.borderWidth) ?? 0
    }

    const borderRadiusStyles: {
      topLeftRadius?: number
      topRightRadius?: number
      bottomLeftRadius?: number
      bottomRightRadius?: number
    } = {}
    if (computedStyles.borderTopLeftRadius !== '0x') {
      borderRadiusStyles.topLeftRadius = convertValueToNum(
        computedStyles.borderTopLeftRadius
      )
    }
    if (computedStyles.borderTopRightRadius !== '0x') {
      borderRadiusStyles.topRightRadius = convertValueToNum(
        computedStyles.borderTopRightRadius
      )
    }
    if (computedStyles.borderBottomLeftRadius !== '0x') {
      borderRadiusStyles.bottomLeftRadius = convertValueToNum(
        computedStyles.borderBottomLeftRadius
      )
    }
    if (computedStyles.borderBottomRightRadius !== '0x') {
      borderRadiusStyles.bottomRightRadius = convertValueToNum(
        computedStyles.borderBottomRightRadius
      )
    }

    let dropShadowStyles = {}
    if (computedStyles.boxShadow && computedStyles.boxShadow !== 'none') {
      const shadowObjs = parseDropShadow(computedStyles.boxShadow)

      dropShadowStyles = {
        dropShadows: shadowObjs,
      }
    }

    const paddingRight = convertValueToNum(computedStyles.paddingRight)
    const paddingLeft = convertValueToNum(computedStyles.paddingLeft)
    const paddingTop = convertValueToNum(computedStyles.paddingTop)
    const paddingBottom = convertValueToNum(computedStyles.paddingBottom)

    return {
      name,
      type: 'FRAME',
      x,
      y,
      width,
      height,
      clipsContent: computedStyles.overflow === 'hidden',
      children: childNodes,
      backgroundFill,
      imageUrl,
      padding: {
        right: paddingRight ? paddingRight + adjustedPadding : undefined,
        left: paddingLeft ? paddingLeft + adjustedPadding : undefined,
        top: paddingTop ? paddingTop + adjustedPadding : undefined,
        bottom: paddingBottom ? paddingBottom + adjustedPadding : undefined,
      },
      ...strokeStyles,
      ...borderRadiusStyles,
      ...dropShadowStyles,
      ...additionalLayoutStyles,
      metadata: {
        display: computedStyles.display,
        node,
      },
    }
  } else if (node.nodeType === 3) {
    if (!parent) {
      throw new Error('no parent found to text node')
    }

    if (!node.parentElement) {
      return
    }

    const range = document.createRange()
    range.selectNodeContents(node)

    const parentRect = parent.getBoundingClientRect()
    const rect = range.getBoundingClientRect()

    const newTextNodes: {
      x: number
      y: number
      width: number
      height: number
      characters: string
    }[] = []

    let currentStart = 0
    let currentText = ''
    const textContent: string = node.textContent ?? ''
    const words = textContent.split(/(\s+)/)
    let lastRect: any = rect

    words.forEach((word) => {
      range.setStart(node, currentStart)
      range.setEnd(node, currentStart + currentText.length + word.length)

      const rects = range.getClientRects()

      lastRect = rects[0]

      if (rects.length > 1) {
        // We have a new line,
        newTextNodes.push({
          x: rects[0].left - parentRect.left,
          y: rects[0].top - parentRect.top,
          width: rects[0].width,
          height: rects[0].height,
          characters: currentText,
        })
        currentStart = currentStart + currentText.length
        currentText = word
        lastRect = rects[1]
      } else {
        currentText += word
      }
    })

    if (lastRect) {
      newTextNodes.push({
        x: lastRect.left - parentRect.left,
        y: lastRect.top - parentRect.top,
        width: lastRect.width,
        height: lastRect.height,
        characters: currentText,
      })
    }

    const computedStyles = getComputedStyle(parent)

    let colorFill: any | undefined = undefined
    if (computedStyles.color !== 'rgba(0, 0, 0, 0)') {
      colorFill = convertRgbaToFigmaFill(computedStyles.color)
    }
    const fontSize = convertValueToNum(computedStyles.fontSize)

    const adjustedFontSize = fontSize ? fontSize * 0.85 : undefined

    if (node.parentElement.tagName.toUpperCase() === 'LI') {
      newTextNodes.push({
        x: -20,
        y: 0,
        width: adjustedFontSize ?? 16,
        height: newTextNodes[0]?.height ?? 16,
        characters: '•',
      })
    }

    return newTextNodes.map((d) => ({
      type: 'TEXT',
      x: d.x,
      y: d.y,
      width: d.width,
      height: d.height,
      characters: d.characters,
      fontSize: adjustedFontSize,
      color: colorFill,
      textAutoResize: 'HEIGHT',
      textAlignVertical: 'CENTER',
      textAlignHorizontal: mapTextAlign(computedStyles.textAlign),
      lineHeight: {
        unit: 'PIXELS',
        value: convertValueToNum(computedStyles.lineHeight),
      },
      fontWeight: mapFontWeightToWord(
        computedStyles.fontWeight,
        computedStyles.fontFamily
      ),
      metadata: {
        display: 'inline',
        node,
      },
      fontFamily: mapFontFamilyToWord(computedStyles.fontFamily),
    }))
  }
}
