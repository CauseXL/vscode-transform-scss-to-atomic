import { Tailwind_Atom_Map } from '../config/atomMap'
import { toCamelCase } from './format'

// * ----------------------------------------------------------------

const BRACE_REX = /[{}]/g

// * ----------------------------------------------------------------

export const formatCSS = (cssStr: string) => {
  const css = cssStr.replace(BRACE_REX, '')
  return css.split(';').map((item: string) => item.split(':'))
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
  const [v, p] = sLine?.includes('from') ? sLine.split('from').map(item => item.trim()) : ['', sLine?.trim()]
  return [v, p]
}