import { formatMinusUnit, formatSpacingCss, getAtomByTypeAndValue, getFullAndRemovePx, removePxUnit } from '../utils'

// TODO: 负数 -1 ｜ -1px -> -[-1px]

// * --------------------------------------------------------------------------------

const CSS_ATOM_TRANS_MAP = {
  // * ---------------- box-sizing
  'border-box': 'border',
  'content-box': 'content',
  // * ---------------- flex
  ['1 1 0%']: '1',
  ['1 1 auto']: 'auto',
  ['0 1 auto']: 'initial',
  // TODO: need flex prefix? // XiaoLiang
  'none': 'none',
  'flex-start': 'start',
  'flex-end': 'end',
  'center': 'center',
  'space-between': 'between',
  'space-around': 'around',
  'space-evenly': 'evenly',
  'baseline': 'baseline',
  'italic': 'italic',
  'normal': 'not-italic',
  'underline': 'underline',
  'overline': 'overline',
  'line-through': 'line-through',
  'no-underline': 'none'
} as const

type KEY_OF_TRANS_MAP = keyof typeof CSS_ATOM_TRANS_MAP

// * -------------------------------------------------------------------------------- layout

const columns = {
  attr: 'columns',
  value: (v: string) => getAtomByTypeAndValue('columns', v),
}

type BreakAfterValue = 'auto' | 'avoid' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'column'
const breakAfter = {
  attr: 'break-after',
  value: (v: BreakAfterValue) => getAtomByTypeAndValue('break-after', v),
}
const breakBefore = {
  attr: 'break-before',
  value: (v: BreakAfterValue) => getAtomByTypeAndValue('break-before', v),
}
const breakInside = {
  attr: 'break-inside',
  value: (v: BreakAfterValue) => getAtomByTypeAndValue('break-inside', v),
}

const boxSizing = {
  attr: 'box-sizing',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('box', CSS_ATOM_TRANS_MAP[v]),
}

const display = {
  attr: 'display',
  value: (v: string) => {
    if (v === 'hidden')
      return 'none'
    return v
  },
}

const float = {
  attr: 'float',
  value: (v: string) => getAtomByTypeAndValue('float', v),
}

const clear = {
  attr: 'clear',
  value: (v: string) => getAtomByTypeAndValue('clear', v),
}

const objectFit = {
  attr: 'object-fit',
  value: (v: string) => getAtomByTypeAndValue('object', v),
}

const objectPosition = {
  attr: 'object-position',
  value: (v: string) => getAtomByTypeAndValue('object', v),
}

const overflow = {
  attr: 'overflow',
  value: (v: string) => getAtomByTypeAndValue('overflow', v),
}

const overflowX = {
  attr: 'overflow-x',
  value: (v: string) => getAtomByTypeAndValue('overflow-x', v),
}

const overflowY = {
  attr: 'overflow-y',
  value: (v: string) => getAtomByTypeAndValue('overflow-y', v),
}

const position = {
  attr: 'position',
  value: (v: string) => v,
}

const left = {
  attr: 'left',
  value: (v: string) => getAtomByTypeAndValue('left', removePxUnit(v)),
}

const right = {
  attr: 'right',
  value: (v: string) => getAtomByTypeAndValue('right', removePxUnit(v)),
}

const top = {
  attr: 'top',
  value: (v: string) => getAtomByTypeAndValue('top', removePxUnit(v)),
}

const bottom = {
  attr: 'bottom',
  value: (v: string) => getAtomByTypeAndValue('bottom', removePxUnit(v)),
}

const visibility = {
  attr: 'visibility',
  value: (v: string) => v,
}

const zIndex = {
  attr: 'z-index',
  value: (v: string) => getAtomByTypeAndValue('z', removePxUnit(v)),
}

// * -------------------------------------------------------------------------------- flex box

const flexBasis = {
  attr: 'flex-basis',
  value: (v: string) => getAtomByTypeAndValue('basis', v),
}

const flexDirection = {
  attr: 'flex-direction',
  value: (v: string) => getAtomByTypeAndValue('flex', v),
}

const flexWrap = {
  attr: 'flex-wrap',
  value: (v: string) => getAtomByTypeAndValue('flex', v),
}

const flex = {
  attr: 'flex',
  value: (v: KEY_OF_TRANS_MAP) => {
    const m = ['1 1 0%', '1 1 auto', '0 1 auto']
    if (m.includes(v)) return getAtomByTypeAndValue('flex', CSS_ATOM_TRANS_MAP[v])
    return `flex-[${v}]`
  }
}

const flexGrow = {
  attr: 'flex-grow',
  value: (v: '0' | '-1') => {
    if (v === '-1')
      return 'grow'
    return 'grow-0'
  },
}

const flexShrink = {
  attr: 'flex-shrink',
  value: (v: '0' | '1') => {
    if (v === '1')
      return 'shrink'
    return 'shrink-0'
  },
}

const order = {
  attr: 'order',
  value: (v: string) => v,
}

const justifyContent = {
  attr: 'justify-content',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('justify', CSS_ATOM_TRANS_MAP[v]),
}

const justifyItems = {
  attr: 'justify-items',
  value: (v: string) => getAtomByTypeAndValue('justify-items', v),
}

const justifySelf = {
  attr: 'justify-self',
  value: (v: string) => getAtomByTypeAndValue('justify-self', v),
}

const alignContent = {
  attr: 'align-content',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('content', CSS_ATOM_TRANS_MAP[v]),
}

const alignItems = {
  attr: 'align-items',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('items', CSS_ATOM_TRANS_MAP[v]),
}

const alignSelf = {
  attr: 'align-self',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('self', CSS_ATOM_TRANS_MAP[v]),
}

const placeContent = {
  attr: 'place-content',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('place-content', CSS_ATOM_TRANS_MAP[v]),
}

const placeItems = {
  attr: 'place-items',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('place-items', CSS_ATOM_TRANS_MAP[v]),
}

const placeSelf = {
  attr: 'place-self',
  value: (v: KEY_OF_TRANS_MAP) => getAtomByTypeAndValue('place-self', CSS_ATOM_TRANS_MAP[v]),
}

// * -------------------------------------------------------------------------------- spacing

const padding = {
  attr: 'padding',
  /**
   * padding: 0
   * padding: 0 0
   * padding: 0 0 0
   * padding: 0 0 0 0
   */
  value: (v: string) => formatSpacingCss('p', v),
}

const paddingLeft = {
  attr: 'padding-left',
  value: (v: string) => formatMinusUnit('pl', v),
}

const paddingTop = {
  attr: 'padding-top',
  value: (v: string) => formatMinusUnit('pt', v),
}

const paddingRight = {
  attr: 'padding-right',
  value: (v: string) => formatMinusUnit('pr', v),
}

const paddingBottom = {
  attr: 'padding-bottom',
  value: (v: string) => formatMinusUnit('pb', v),
}

const margin = {
  attr: 'margin',
  value: (v: string) => formatSpacingCss('m', v),
}

const marginLeft = {
  attr: 'margin-left',
  value: (v: string) => formatMinusUnit('ml', v),
}

const marginTop = {
  attr: 'margin-top',
  value: (v: string) => formatMinusUnit('mt', v),
}

const marginRight = {
  attr: 'margin-right',
  value: (v: string) => formatMinusUnit('mr', v),
}

const marginBottom = {
  attr: 'margin-bottom',
  value: (v: string) => formatMinusUnit('mb', v),
}

// * -------------------------------------------------------------------------------- sizing

const width = {
  attr: 'width',
  value: (v: string) => getAtomByTypeAndValue('w', getFullAndRemovePx(v)),
}

const minWidth = {
  attr: 'min-width',
  value: (v: string) => getAtomByTypeAndValue('min-w', getFullAndRemovePx(v)),
}

const maxWidth = {
  attr: 'max-width',
  value: (v: string) => getAtomByTypeAndValue('max-w', getFullAndRemovePx(v)),
}

const height = {
  attr: 'height',
  value: (v: string) => getAtomByTypeAndValue('h', getFullAndRemovePx(v)),
}

const minHeight = {
  attr: 'min-height',
  value: (v: string) => getAtomByTypeAndValue('min-h', getFullAndRemovePx(v)),
}

const maxHeight = {
  attr: 'max-height',
  value: (v: string) => getAtomByTypeAndValue('max-h', getFullAndRemovePx(v)),
}

// * -------------------------------------------------------------------------------- text

const fontSize = {
  attr: 'font-size',
  value: (v: string) => `text-[${v}]`,
}

const fontStyle = {
  attr: 'font-style',
  value: (v: KEY_OF_TRANS_MAP) => CSS_ATOM_TRANS_MAP[v]
}

const fontWeight = {
  attr: 'font-weight',
  value: (v: string) => `font-weight-[${removePxUnit(v)}]`,
}

const letterSpacing = {
  attr: 'letter-spacing',
  value: (v: string) => `tracking-[${removePxUnit(v)}]`,
}

const lineHeight = {
  attr: 'line-height',
  value: (v: string) => `leading-[${removePxUnit(v)}]`,
}

const listStyleType = {
  attr: 'list-style-type',
  value: (v: string) => getAtomByTypeAndValue('list-style', v),
}

const listStylePosition = {
  attr: 'list-style-position',
  value: (v: string) => getAtomByTypeAndValue('list-style', v),
}

const textAlign = {
  attr: 'text-align',
  value: (v: string) => getAtomByTypeAndValue('text', v),
}

const color = {
  attr: 'color',
  value: (v: string) => `color-[${v}]`,
}

const textDecorationLine = {
  attr: 'text-decoration-line',
  value: (v: KEY_OF_TRANS_MAP) => CSS_ATOM_TRANS_MAP[v]
}

const textDecorationColor = {
  attr: 'text-decoration-color',
  value: (v: string) => `decoration-[${v}]`,
}

const textDecorationStyle = {
  attr: 'text-decoration-style',
  value: (v: string) => getAtomByTypeAndValue('decoration', v)
}

const textDecorationThickness = {
  attr: 'text-decoration-thickness',
  value: (v: string) => `decoration-[${v}]`,
}

const textDecorationOffset = {
  attr: 'text-decoration-offset',
  value: (v: string) => `underline-offset-[${v}]`,
}

const textTransform = {
  attr: 'text-transform',
  value: (v: string) => {
    if (v === 'none') return 'normal-case'
    return v
  }
}

const textOverflow = {
  attr: 'text-overflow',
  value: (v: string) => getAtomByTypeAndValue('text', v)
}

const textIndent = {
  attr: 'text-indent',
  value: (v: string) => `indent-[${v}]`,
}

const verticalAlign = {
  attr: 'vertical-align',
  value: (v: string) => getAtomByTypeAndValue('align', v)
}

const whiteSpace = {
  attr: 'white-space',
  value: (v: string) => getAtomByTypeAndValue('whitespace', v)
}

const content = {
  attr: 'content',
  value: (v: string) => getAtomByTypeAndValue('content', v),
}

// * -------------------------------------------------------------------------------- backgrounds

const backgroundAttachment = {
  attr: 'background-attachment',
  value: (v: string) => getAtomByTypeAndValue('bg', v),
}

const backgroundClip = {
  attr: 'background-clip',
  value: (v: string) => getAtomByTypeAndValue('bg-clip', v.replace('-box', '')),
}

const backgroundColor = {
  attr: 'background-color',
  value: (v: string) => `bg-[${v}]`,
}

const backgroundOrigin = {
  attr: 'background-origin',
  value: (v: string) => getAtomByTypeAndValue('bg-origin', v.replace('-box', '')),
}

const backgroundPosition = {
  attr: 'background-position',
  value: (v: string) => getAtomByTypeAndValue('bg', v.split(' ').join('-')),
}

const backgroundRepeat = {
  attr: 'background-repeat',
  value: (v: string) => getAtomByTypeAndValue('bg', v),
}

const backgroundSize = {
  attr: 'background-size',
  value: (v: string) => getAtomByTypeAndValue('bg', v),
}

const backgroundImage = {
  attr: 'background-image',
  value: (v: string) => `bg-[${v}]`,
}

// * -------------------------------------------------------------------------------- border

const borderRadius = {
  attr: 'border-radius',
  value: (v: string) => `rounded-[${v}]`,
}

const borderTopLeftRadius = {
  attr: 'border-top-left-radius',
  value: (v: string) => `rounded-t-[${v}]`,
}

const borderTopRightRadius = {
  attr: 'border-top-right-radius',
  value: (v: string) => `rounded-r-[${v}]`,
}

const borderBottomRightRadius = {
  attr: 'border-bottom-right-radius',
  value: (v: string) => `rounded-b-[${v}]`,
}

const borderBottomLeftRadius = {
  attr: 'border-bottom-left-radius',
  value: (v: string) => `rounded-l-[${v}]`,
}

const borderWidth = {
  attr: 'border-width',
  value: (v: string) => `border-[${v}]`,
}

const borderColor = {
  attr: 'border-color',
  value: (v: string) => `border-[${v}]`,
}

const borderStyle = {
  attr: 'border-style',
  value: (v: string) => getAtomByTypeAndValue('border', v),
}

const outlineWidth = {
  attr: 'outline-width',
  value: (v: string) => `outline-[${v}]`,
}

const outlineColor = {
  attr: 'outline-color',
  value: (v: string) => `outline-[${v}]`,
}

const outlineStyle = {
  attr: 'outline-style',
  value: (v: string) => getAtomByTypeAndValue('outline', v),
}

const outlineOffset = {
  attr: 'outline-offset',
  value: (v: string) => `outline-offset-[${v}]`,
}

// * --------------------------------------------------------------------------------

const opacity = {
  attr: 'opacity',
  value: (v: string) => `opacity-[${v}]`,
}

const filter = {
  attr: 'filter',
  value: (v: string) => `blur-[${v}]`,
}

// * --------------------------------------------------------------------------------

export const Tailwind_Atom_Map: any = {
  columns,
  breakAfter,
  breakBefore,
  breakInside,
  boxSizing,
  display,
  float,
  clear,
  objectFit,
  objectPosition,
  overflow,
  overflowX,
  overflowY,
  position,
  left,
  right,
  bottom,
  top,
  visibility,
  zIndex,
  flexBasis,
  flexDirection,
  flexWrap,
  flex,
  flexGrow,
  flexShrink,
  order,
  justifyContent,
  justifyItems,
  justifySelf,
  alignContent,
  alignItems,
  alignSelf,
  placeContent,
  placeItems,
  placeSelf,
  padding,
  paddingLeft,
  paddingBottom,
  paddingRight,
  paddingTop,
  margin,
  marginLeft,
  marginBottom,
  marginRight,
  marginTop,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  listStyleType,
  listStylePosition,
  textAlign,
  color,
  textDecorationLine,
  textDecorationColor,
  textDecorationStyle,
  textDecorationThickness,
  textDecorationOffset,
  textTransform,
  textOverflow,
  textIndent,
  verticalAlign,
  whiteSpace,
  content,
  backgroundAttachment,
  backgroundClip,
  backgroundColor,
  backgroundOrigin,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  backgroundImage,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderWidth,
  borderColor,
  borderStyle,
  outlineWidth,
  outlineStyle,
  outlineColor,
  outlineOffset,
  opacity,
  filter
}
