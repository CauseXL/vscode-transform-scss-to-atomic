export const replace = (currentFile: string, cssMap: Map<string, string>, replaceVar: string) => {
  let template = currentFile
  cssMap.forEach((v, k) => {
    const lastK = k.split(' ').slice(-1)[0]
    const className = `${replaceVar}${lastK}`
    template = template.replace(className, `'${v}'`)
  })
  return template
}
