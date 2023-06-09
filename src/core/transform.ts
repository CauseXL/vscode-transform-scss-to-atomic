import * as fs from 'fs'
import * as vscode from 'vscode'
import * as csstree from 'css-tree'
import sass from 'sass'
import { INFO_PREFIX } from '..'

// * ---------------------------------------------------------------- inter

type CssProperty = string
type CssValue = string
export type CssProAndValue = [CssProperty, CssValue]

// * ---------------------------------------------------------------- util

const formatCssToArray = (cssStr: string): CssProAndValue[] => {
  const BRACE_REX = /[{}]/g
  const css = cssStr.replace(BRACE_REX, '')
  const lines = css.split(';')
  return lines.map((line: string) => line.split(':')) as CssProAndValue[]
}

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
export const transformToCssMapFromFile = async (cssFilePath: string) => {
  // Compile the SCSS to CSS
  const res = new Map<string, CssProAndValue[]>()

  return new Promise((resolve, reject) => {
    sass.render({
      file: cssFilePath,
    }, (err, result) => {
      if (err) {
        reject(err)
        // ! remove this line when run test
        vscode.window.showErrorMessage(`${INFO_PREFIX}: ${err}`)
        fs.unlinkSync(cssFilePath);
      }
      else {
        const cssStr = result?.css && Buffer.from(result.css).toString()
        const ast = csstree.parse(cssStr || '')
        // TODO: scss/less variable // XiaoLiang
        csstree.walk(ast, (node: any) => {
          if (node.type === 'Rule') {
            const selector = csstree.generate(node.prelude)
            const childrenNode = csstree.generate(node.block)
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
