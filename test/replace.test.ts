import { describe, expect, it } from 'vitest'

// * ----------------------------------------------------------------

const template = `
<div className={style.pc_lenovo_box}>
<div className={style.pc_lenovo_box}>
<div className={style.pc_lenovo_box_ss}>
<div className={ style.pc_lenovo_box }>
<div className={style['pc_lenovo_box']}>
<div className={style["pc_lenovo_box"]}>
<div className="pc_lenovo_box">
<div className=" pc_lenovo_box ">
`

const replaceV = 'h-full';
const lastK = '.pc_lenovo_box'
const replaceVar = 'style'
const className = `${replaceVar}${lastK}`
const className_2 = `${replaceVar}\\['${lastK.slice(1)}'\\]`
const className_3 = `${replaceVar}\\["${lastK.slice(1)}"\\]`

const replace = (template: string, v: string) => {
  template = template.replace(new RegExp(className, 'g'), `'${v}'`)
  template = template.replace(new RegExp(className_2, 'g'), `'${v}'`)
  template = template.replace(new RegExp(className_3, 'g'), `'${v}'`)
  return template
}

// * ----------------------------------------------------------------

describe('Replace function', () => {
  it('should work', () => {
    const newTemp = replace(template, replaceV)
    expect(newTemp).toMatchInlineSnapshot(`
      "
      <div className={'h-full'}>
      <div className={'h-full'}>
      <div className={'h-full'_ss}>
      <div className={ 'h-full' }>
      <div className={'h-full'}>
      <div className={'h-full'}>
      <div className=\\"pc_lenovo_box\\">
      <div className=\\" pc_lenovo_box \\">
      "
    `)
  })
})


