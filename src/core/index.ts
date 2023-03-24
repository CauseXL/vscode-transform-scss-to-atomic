import { getAtomByCss } from '../utils'
import { getCssValueFromFile } from './transform'

type OriginClassName = string
type AtomClassName = string

export const main = async (filePath: string) => {
  const cssMap = await getCssValueFromFile(filePath) as Map<string, string[][]>
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
