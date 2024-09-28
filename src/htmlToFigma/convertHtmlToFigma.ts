// THIS IS ALL OLD LOGIC, BUT KEEPING IT AROUND BECAUSE ITS GOOD STUFF

// import { convertBackgroundToFigmaFill } from "./utils/convertBackgroundToFigmaFill";
// import { convertFontWeightToWord } from "./utils/convertFontWeightToWord";
// import { convertHexToFigmaRgba } from "./utils/convertHexToFigmaRgba";
// import { convertRgbaToFigmaRgba } from "./utils/convertRgbaToFigmaRgba";
// import { convertValueToNum } from "./utils/convertValueToNum";
// import { getRawCssValue } from "./utils/getRawCssValue";
// import { parseDropShadow } from "./utils/parseDropShadow";
// import { parseGradient } from "./utils/parseGradient";
// import { replaceCssVariables } from "./utils/replaceCssVariables";

// export function convertHtmlToFigma() {
//   const rootElement = document.getElementById("figma-root");

//   if (!rootElement) {
//     return;
//   }

//   const output = handleChildNode(rootElement);

//   console.log(JSON.stringify(output));

//   return JSON.stringify(output);
// }

// function rgbToHex(rgb: string): string {
//   // Extract the integers and possible floating points for alpha from the string
//   const nums = rgb.match(/\d+(\.\d+)?/g);
//   if (!nums || nums.length < 3 || nums.length > 4) {
//     throw new Error("Invalid RGB or RGBA format");
//   }

//   // Convert each RGB(A) component to a hexadecimal string
//   const hex = nums
//     .map((n, index) => {
//       if (index < 3) {
//         // RGB components (0-255)
//         const num = parseInt(n);
//         if (num < 0 || num > 255) {
//           throw new Error("RGB values must be between 0 and 255");
//         }
//         return num.toString(16).padStart(2, "0").toUpperCase();
//       } else {
//         // Alpha component (0-1)
//         const alpha = parseFloat(n);
//         if (alpha < 0 || alpha > 1) {
//           throw new Error("Alpha value must be between 0 and 1");
//         }
//         return Math.round(alpha * 255)
//           .toString(16)
//           .padStart(2, "0")
//           .toUpperCase();
//       }
//     })
//     .join("");

//   return `#${hex}`;
// }

// const TEXT_TAGS = ["P", "H1", "H2", "LABEL"];

// const handleChildNode = (node: ChildNode, parent?: Element) => {
//   if (node instanceof Element) {
//     const computedStyles = getComputedStyle(node);

//     if (node.checkVisibility() === false) {
//       return;
//     }

//     let name = "Container";
//     if (node.tagName === "INPUT") {
//       name = "Input";
//     } else if (node.tagName === "BUTTON") {
//       name = "Button";
//     } else if (
//       node.tagName === "H1" ||
//       node.tagName === "H2" ||
//       node.tagName === "H3" ||
//       node.tagName === "H4" ||
//       node.tagName === "H5" ||
//       node.tagName === "H6"
//     ) {
//       name = "Heading";
//     } else if (node.tagName === "P") {
//       name = "Paragraph";
//     } else if (node.tagName === "LABEL") {
//       name = "Label";
//     } else if (node.tagName === "Section") {
//       name = "Section";
//     } else if (node.tagName === "FORM") {
//       name = "Form";
//     } else if (node.tagName === "IMG") {
//       name = "Image";
//     }

//     const childNodes = [];
//     for (const c of node.childNodes) {
//       childNodes.push(handleChildNode(c, node));
//     }

//     if (node.tagName === "INPUT") {
//       const inputEle = node as HTMLInputElement;

//       if (inputEle.value) {
//         childNodes.push({
//           name: "Input Value",
//           type: "TEXT",
//           characters: inputEle.value || "",
//           fontSize: convertValueToNum(computedStyles.fontSize),
//           lineHeight: {
//             unit: "PIXELS",
//             value: convertValueToNum(computedStyles.lineHeight),
//           },
//           color: rgbToHex(computedStyles.color),
//           fontWeight: convertFontWeightToWord(computedStyles.fontWeight),
//         });
//       } else {
//         const placeholderStyles = getComputedStyle(inputEle, "::placeholder");

//         childNodes.push({
//           name: "Input Placeholder",
//           type: "TEXT",
//           characters: node.getAttribute("placeholder") || "",
//           fontSize: convertValueToNum(computedStyles.fontSize),
//           fontWeight: convertFontWeightToWord(computedStyles.fontWeight),
//           lineHeight: {
//             unit: "PIXELS",
//             value: convertValueToNum(computedStyles.lineHeight),
//           },
//           color: "#a9a9a9", // HARD CODE THIS FOR NOW
//         });
//       }
//     }

//     let layoutMode = "VERTICAL";
//     let layoutSizingHorizontal: string | undefined = undefined;
//     let layoutSizingVertical: string | undefined = undefined;
//     let counterAxisAlignItems: string | undefined = undefined;
//     let primaryAxisAlignItems: string | undefined = undefined;
//     if (TEXT_TAGS.includes(node.tagName)) {
//       layoutMode = "HORIZONTAL";
//       layoutSizingVertical = "HUG";

//       if (computedStyles.textAlign === "center") {
//         primaryAxisAlignItems = "CENTER";
//       }
//     } else if (node.tagName === "BUTTON") {
//       layoutMode = "HORIZONTAL";
//       layoutSizingVertical = "HUG";
//       primaryAxisAlignItems = "CENTER";
//     }

//     if (computedStyles.display === "inline" && parent) {
//       layoutSizingHorizontal = "HUG";
//     } else if (
//       (computedStyles.display === "block" ||
//         computedStyles.display === "inline-block") &&
//       parent
//     ) {
//       layoutSizingHorizontal = "FILL";
//     } else if (computedStyles.display === "flex") {
//       if (computedStyles.flexDirection === "row") {
//         layoutMode = "HORIZONTAL";

//         layoutSizingHorizontal = "FILL";
//       } else if (computedStyles.flexDirection === "column") {
//         layoutMode = "VERTICAL";
//         layoutSizingVertical = "FILL";
//       }

//       if (computedStyles.justifyContent === "flex-start") {
//         primaryAxisAlignItems = "MIN";
//       } else if (computedStyles.justifyContent === "center") {
//         primaryAxisAlignItems = "CENTER";
//       } else if (computedStyles.justifyContent === "flex-end") {
//         primaryAxisAlignItems = "MAX";
//       } else if (computedStyles.justifyContent === "space-between") {
//         primaryAxisAlignItems = "SPACE_BETWEEN";
//       }

//       if (computedStyles.alignItems === "flex-start") {
//         counterAxisAlignItems = "MIN";
//       } else if (computedStyles.alignItems === "center") {
//         counterAxisAlignItems = "CENTER";
//       } else if (computedStyles.alignItems === "flex-end") {
//         counterAxisAlignItems = "MAX";
//       }
//     }

//     // Handle if it's a flex child
//     const parentComputedStyles = parent ? getComputedStyle(parent) : undefined;
//     if (parentComputedStyles && parentComputedStyles.display === "flex") {
//       layoutSizingHorizontal = "HUG";

//       if (parentComputedStyles.flexDirection === "column") {
//         if (computedStyles.flexGrow === "1") {
//           layoutSizingVertical = "FILL";
//         } else {
//           layoutSizingVertical = "HUG";
//         }
//       } else if (parentComputedStyles.flexDirection === "row") {
//         if (computedStyles.flexGrow === "1") {
//           layoutSizingHorizontal = "FILL";
//         } else {
//           layoutSizingHorizontal = "HUG";
//         }
//       }
//     }

//     if (
//       parentComputedStyles &&
//       parentComputedStyles.width === computedStyles.width
//     ) {
//       layoutSizingHorizontal = "FILL";
//     }

//     if (
//       parentComputedStyles &&
//       parentComputedStyles.height === computedStyles.height
//     ) {
//       layoutSizingVertical = "FILL";
//     }

//     // Since stroke goes on inside in Figma, we need to add border width to padding
//     let adjustedPadding = 0;

//     let borderStyles = {};
//     if (computedStyles.borderWidth !== "0px") {
//       borderStyles = {
//         border: {
//           borderWeight: convertValueToNum(computedStyles.borderWidth),
//           borderFill: rgbToHex(computedStyles.borderColor),
//         },
//       };

//       adjustedPadding += convertValueToNum(computedStyles.borderWidth) ?? 0;
//     }

//     const backgroundColorCssValue = getRawCssValue(node, "background-color");
//     const backgroundImageCssValue = getRawCssValue(node, "background-image");
//     const backgroundCssValue = getRawCssValue(node, "background");
//     let backgroundFill: any | undefined = undefined;

//     if (backgroundColorCssValue) {
//       backgroundFill = convertBackgroundToFigmaFill(
//         computedStyles.backgroundColor
//       );
//     } else if (backgroundImageCssValue) {
//       backgroundFill = convertBackgroundToFigmaFill(
//         computedStyles.backgroundImage
//       );
//     } else if (backgroundCssValue) {
//       backgroundFill = convertBackgroundToFigmaFill(computedStyles.background);
//     } else if (!parent) {
//       const figmaRgba = convertRgbaToFigmaRgba(computedStyles.backgroundColor);
//       let colorToUse: any = { r: 1, g: 1, b: 1 };

//       if (figmaRgba.a && figmaRgba.a !== 0) {
//         colorToUse = { ...figmaRgba, a: undefined };
//       }

//       backgroundFill = {
//         blendMode: "NORMAL",
//         type: "SOLID",
//         color: colorToUse,
//         boundVariables: {},
//         opacity: 1,
//         visible: true,
//       } as const;
//     } else if (name === "Image") {
//       backgroundFill = {
//         blendMode: "NORMAL",
//         type: "SOLID",
//         color: {
//           r: 0.2,
//           g: 0.2,
//           b: 0.2,
//         },
//         boundVariables: {},
//         opacity: 1,
//         visible: true,
//       } as const;
//     }

//     let borderRadiusStyles = {};
//     if (computedStyles.borderRadius !== "0x") {
//       borderRadiusStyles = {
//         borderRadius: convertValueToNum(computedStyles.borderRadius),
//       };
//     }

//     let dropShadowStyles = {};
//     if (computedStyles.boxShadow && computedStyles.boxShadow !== "none") {
//       const shadowObjs = parseDropShadow(computedStyles.boxShadow);

//       dropShadowStyles = {
//         dropShadows: shadowObjs,
//       };
//     }

//     const width = convertValueToNum(computedStyles.width);
//     const height = convertValueToNum(computedStyles.height);

//     // If it has hard-coded width & height, make sure to respect that
//     const widthCssValue = getRawCssValue(node, "width");
//     if (widthCssValue && widthCssValue !== "auto" && widthCssValue !== "100%") {
//       layoutSizingHorizontal = "FIXED";
//     }

//     const heightCssValue = getRawCssValue(node, "height");
//     const minHeightCssValue = getRawCssValue(node, "min-height");
//     if (
//       heightCssValue &&
//       heightCssValue !== "auto" &&
//       heightCssValue !== "100%"
//     ) {
//       layoutSizingVertical = "FIXED";
//     } else if (
//       minHeightCssValue &&
//       minHeightCssValue !== "auto" &&
//       minHeightCssValue !== "100%"
//     ) {
//       layoutSizingVertical = "FIXED";
//     }

//     const adjustedHeight = height ? height * 1 : undefined;
//     const adjustedWidth = width ? width * 1 : undefined;

//     const paddingRight = convertValueToNum(computedStyles.paddingRight);
//     const paddingLeft = convertValueToNum(computedStyles.paddingLeft);
//     const paddingTop = convertValueToNum(computedStyles.paddingTop);
//     const paddingBottom = convertValueToNum(computedStyles.paddingBottom);

//     const nodeToReturn: any = {
//       name,
//       type: "FRAME",
//       width: adjustedWidth,
//       height: adjustedHeight,
//       padding: {
//         right: paddingRight ? paddingRight + adjustedPadding : undefined,
//         left: paddingLeft ? paddingLeft + adjustedPadding : undefined,
//         top: paddingTop ? paddingTop + adjustedPadding : undefined,
//         bottom: paddingBottom ? paddingBottom + adjustedPadding : undefined,
//       },
//       layoutMode,
//       layoutSizingHorizontal,
//       layoutSizingVertical,
//       ...borderStyles,
//       ...borderRadiusStyles,
//       ...dropShadowStyles,
//       backgroundFill,
//       counterAxisAlignItems,
//       primaryAxisAlignItems,
//       children: childNodes,
//     };

//     // For now, attach a surrounding frame for margin
//     const marginTop = convertValueToNum(computedStyles.marginTop);
//     const marginRight = convertValueToNum(computedStyles.marginRight);
//     const marginBottom = convertValueToNum(computedStyles.marginBottom);
//     const marginLeft = convertValueToNum(computedStyles.marginLeft);

//     if (marginTop || marginRight || marginBottom || marginLeft) {
//       // Always fill the margin container
//       // The margin container should take the size of the parent
//       //   nodeToReturn.layoutSizingVertical = "FILL";
//       //   nodeToReturn.layoutSizingHorizontal = "FILL";

//       const newParent: any = {
//         name: "Margin Container",
//         type: "FRAME",
//         layoutMode,
//         layoutSizingHorizontal: layoutSizingHorizontal ?? "HUG",
//         layoutSizingVertical: layoutSizingVertical ?? "HUG",
//         padding: {
//           top: marginTop,
//           right: marginRight,
//           bottom: marginBottom,
//           left: marginLeft,
//         },
//         children: [nodeToReturn],
//       };

//       return newParent;
//     }

//     return nodeToReturn;
//   } else if (node.nodeType === 3) {
//     if (!parent) {
//       throw new Error("no parent found to text node");
//     }

//     const computedStyles = getComputedStyle(parent);

//     let colorFill: string | undefined = undefined;
//     if (computedStyles.color !== "rgba(0, 0, 0, 0)") {
//       colorFill = rgbToHex(computedStyles.color);
//     }
//     const fontSize = convertValueToNum(computedStyles.fontSize);

//     const adjustedFontSize = fontSize ? fontSize * 0.9 : undefined;
//     return {
//       type: "TEXT",
//       characters: node.textContent,
//       fontSize: adjustedFontSize,
//       color: colorFill,
//       textAlignHorizontal: `${computedStyles.textAlign}`.toUpperCase(),
//       lineHeight: {
//         unit: "PIXELS",
//         value: convertValueToNum(computedStyles.lineHeight),
//       },
//       fontWeight: convertFontWeightToWord(computedStyles.fontWeight),
//     };
//   }
//   //   } else if (TEXT_TAGS.includes(ele.tagName)) {
//   //     return {
//   //       name: ele.tagName.toLowerCase(),
//   //       type: "TEXT",
//   //       characters: ele.innerHTML,
//   //       fontSize: convertValueToNum(computedStyles.fontSize),
//   //       layoutSizingHorizontal: parent ? "FILL" : undefined,
//   //       textAlignHorizontal: `${computedStyles.textAlign}`.toUpperCase(),
//   //     };
//   //   }
// };
