import { getAtomByCss } from '../utils'
import type { CssProAndValue } from './transform'
import { transformToCssMapFromFile } from './transform'

type OriginClassName = string
type AtomClassName = string

export type ATOM_MAP = Map<OriginClassName, AtomClassName>

export const getOCtoACRelation = async (filePath: string) => {
  const cssMap = await transformToCssMapFromFile(filePath) as Map<OriginClassName, CssProAndValue[]>
  const resMap: ATOM_MAP = new Map()

  cssMap.forEach((value, key) => {
    const atomClass = getAtomByCss(value)
    if (resMap.has(key))
      resMap.set(key, resMap.get(key) + atomClass)
    else
      resMap.set(key, atomClass)
  })

  return resMap
}


