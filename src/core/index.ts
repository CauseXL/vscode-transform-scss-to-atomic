import { getAtomByCss } from '../utils'
import type { CssProAndValue } from './transform'
import { transformToCssMapFromFile } from './transform'

type OriginClassName = string
type AtomClassName = string

export const getOCtoACRelation = async (filePath: string) => {
  const cssMap = await transformToCssMapFromFile(filePath) as Map<OriginClassName, CssProAndValue[]>
  const resMap = new Map<OriginClassName, AtomClassName>()

  cssMap.forEach((value, key) => {
    const atomClass = getAtomByCss(value)
    if (resMap.has(key))
      resMap.set(key, resMap.get(key) + atomClass)
    else
      resMap.set(key, atomClass)
  })

  return resMap
}
