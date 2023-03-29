import { compose } from './compose'

export const toCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

export const removePxUnit = (v: string | number) => String(v).replace('px', '')

export const getFullValue = (v: string) => v === '100%' ? 'full' : v

export const getFullAndRemovePx = (v: string) => compose<string>(getFullValue, removePxUnit)(v)

/** format margin padding to atom class */
export const formatSpacingCss = (type: 'm' | 'p', v: string) => {
  const vArr = v.split(' ').map(v => removePxUnit(v.trim()));
  if (vArr.length === 1) {
    return `${type}-${vArr[0]}`
  } else if (vArr.length === 2) {
    const [y, x] = vArr
    return `${type}x-${x} ${type}y-${y}`
  } else if (vArr.length === 3) {
    const [yt, x, yb] = vArr
    return `${type}t-${yt} ${type}b-${yb} ${type}r-${x}`
  } else if (vArr.length === 4) {
    const [yt, xr, yb, xl] = vArr
    return `${type}t-${yt} ${type}b-${yb} ${type}r-${xr} ${type}l-${xl}`
  } else {
    return ''
  }
}

/** format minus unit to atom class */
export const formatMinusUnit = (type: string, v: string | number): string => {
  if (typeof v === 'number') {
    if (v < 0) return `${type}-[${String(-v).trim()}]`
  } else if (typeof v === 'string') {
    if (v.startsWith('-')) return `${type}-[${v.trim()}]`
  }
  return `${type}-${removePxUnit(v).trim()}`
}

/** format atom class to `type-value` */
export const getAtomByTypeAndValue = (type: string, v: string) => {
  const vArr = v?.trim().split(' ')
  if (vArr?.length > 1)
    return `${type}-${vArr.join('-')}`

  return `${type}-${v?.trim()}`
}

