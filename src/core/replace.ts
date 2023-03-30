import * as fs from 'fs'

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

export const replaceCssVariable = (cssPath: string, type = 'sass') => {
  const fileStream = fs.readFileSync(cssPath, 'utf-8')

  /** @include --> // @include */
  let newStream = fileStream.replace(/\@include/g, '// @include')
  newStream = newStream.replace(/[$@]/g, '')

  const path = cssPath;
  const lastIndex = path.lastIndexOf('.')
  const backUpPath = `${path.slice(0, lastIndex)}-backup${path.slice(lastIndex)}`
  fs.writeFileSync(backUpPath, newStream);
  return backUpPath
}
