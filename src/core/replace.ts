/**
 * replace current file's class from style to atomic
 * ${style.test} -> ${cssMap.get('.test')} -> 'flex top-0'
 */
export const replace = (currentFileStream: string, cssMap: Map<string, string>, replaceVar: string) => {
  let template = currentFileStream
  cssMap.forEach((v, k) => {
    const lastK = k.split(' ').slice(-1)[0] // .className
    if (!replaceVar) {
      const className = `${lastK.slice(1)}`
      template = template.replace(className, `'${v}'`)
    }
    else {
      /**
       * 1. style.className
       * 2. style[className]
       */
      const className = `${replaceVar}${lastK}`
      // ${lastK.slice(1)} -> remove first '.' character
      // TODO: regex // XiaoLiang
      const className_2 = `${replaceVar}\\['${lastK.slice(1)}'\\]`
      const className_3 = `${replaceVar}\\["${lastK.slice(1)}"\\]`
      template = template.replace(new RegExp(className, 'g'), `'${v}'`)
      template = template.replace(new RegExp(className_2, 'g'), `'${v}'`)
      template = template.replace(new RegExp(className_3, 'g'), `'${v}'`)
    }
  })
  return template
}
