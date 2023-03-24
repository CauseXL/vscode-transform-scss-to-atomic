import { getAtomByTypeAndValue, removePxUnit } from '../utils'

// * --------------------------------------------------------------------------------

const CSS_ATOM_TRANS_MAP = {
  // * ---------------- box-sizing
  'border-box': 'border',
  'content-box': 'content',
}

// * --------------------------------------------------------------------------------

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
  value: (v: 'border-box' | 'content-box') => getAtomByTypeAndValue('box', CSS_ATOM_TRANS_MAP[v]),
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

const flexBasis = {
  attr: 'flex-basis',
  value: (v: string) => getAtomByTypeAndValue('basis', removePxUnit(v)),
}

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
}
