import * as cssTree from 'css-tree'
import sass from 'sass'

const formatCssToArray = (cssStr: string): string[][] => {
  const BRACE_REX = /[{}]/g
  const css = cssStr.replace(BRACE_REX, '')
  const lines = css.split(';')
  return lines.map((line: string) => line.split(':'))
}

export const getCssValueFromFile = async (cssFile: string) => {
  // Compile the SCSS to CSS
  const res = new Map<string, string[][]>()

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

        // const result = sass.renderSync({ file: cssFile })
        // Parse the CSS and extract the selectors and properties

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
