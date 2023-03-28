import { Tailwind_Atom_Map } from '../config/atomMap'
import { compose } from './compose'

// * ----------------------------------------------------------------

const BRACE_REX = /[{}]/g

export const toCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

export const removePxUnit = (v: string | number) => String(v).replace('px', '')

export const getFullValue = (v: string) => v === '100%' ? 'full' : v

export const getFullAndRemovePx = (v: string) => compose<string>(getFullValue, removePxUnit)(v)

export const formatMinusUnit = (type: string, v: string | number): string => {
  if (typeof v === 'number') {
    if (v < 0) return `${type}-[${String(-v).trim()}]`
  } else if (typeof v === 'string') {
    if (v.startsWith('-')) return `${type}-[${v.trim()}]`
  }
  return `${type}-${removePxUnit(v).trim()}`
}

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

export const formatCSS = (cssStr: string) => {
  const css = cssStr.replace(BRACE_REX, '')
  return css.split(';').map((item: string) => item.split(':'))
}

export const getAtomByTypeAndValue = (type: string, v: string) => {
  const vArr = v?.trim().split(' ')
  if (vArr?.length > 1)
    return `${type}-${vArr.join('-')}`

  return `${type}-${v?.trim()}`
}

export const getAtomByCss = (cssRules: string[][]) => {
  return cssRules.map((rule: string[]) => {
    const [attr, value] = rule
    return Tailwind_Atom_Map[toCamelCase(attr)]?.value(value, attr)
  }).join(' ')
}

// * ----------------------------------------------------------------

/**
 * Search user current file below line
 * import xx from 'xx/index.[xx].scss'
 * and return [xx, 'xx/index.[xx].scss']
 */
export const getCssFilePathFromFile = (fileStream: string) => {
  const importLines = fileStream.split('import')
  const sLine = importLines.find(item => item.includes('.scss'))
    ?.split('\n')[0]
    ?.replace(/'/g, '').replace(/"/g, '').replace(/;/g, '')
  const [v, p] = sLine?.includes('from') ? sLine.split('from').map(item => item.trim()) : ['', sLine]
  return [v, p]
}
