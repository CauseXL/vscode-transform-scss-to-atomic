import * as cssTree from 'css-tree'
import sass from 'sass'

// * ---------------------------------------------------------------- inter

type CssProperty = string
type CssValue = string
export type CssProAndValue = [CssProperty, CssValue]

// * ---------------------------------------------------------------- func

/**
 *
 * @get .pc_lenovo_box {
    margin: 0 auto;
    display: flex;
  }
 * 
 * @return ".pc_lenovo_box" => [
    [
      "margin",
      "0 auto",
    ],
    [
      "display",
      "flex",
    ]
  ]
 */
export const transformToCssMapFromFile = async (cssFile: string) => {
  // Compile the SCSS to CSS
  const res = new Map<string, CssProAndValue[]>()

  return new Promise((resolve) => {
    sass.render({
      file: cssFile,
    }, (err, result) => {
      if (err) {
        console.error(err)
        resolve(res)
      }
      else {
        const cssStr = result?.css && Buffer.from(result.css).toString()
        const ast = cssTree.parse(cssStr || '')
        // TODO: scss/less variable // XiaoLiang
        cssTree.walk(ast, (node: any) => {
          if (node.type === 'Rule') {
            const selector = cssTree.generate(node.prelude)
            const childrenNode = cssTree.generate(node.block)
            if (res.has(selector))
              res.set(selector, formatCssToArray(res.get(selector) + childrenNode))
            else
              res.set(selector, formatCssToArray(childrenNode))
          }
        })
        resolve(res)
      }
    })
  })
}

// * ---------------------------------------------------------------- util

const formatCssToArray = (cssStr: string): CssProAndValue[] => {
  const BRACE_REX = /[{}]/g
  const css = cssStr.replace(BRACE_REX, '')
  const lines = css.split(';')
  return lines.map((line: string) => line.split(':')) as CssProAndValue[]
}
