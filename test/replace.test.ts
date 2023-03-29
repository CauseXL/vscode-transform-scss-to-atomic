import { describe, expect, it } from 'vitest'
import { ATOM_MAP } from '../src/core'
import { replace } from '../src/core/replace'
import { sortMapByKeyLength } from '../src/utils'

// * ----------------------------------------------------------------

const template = `
<div className={style.pc_lenovo_box}>
<div className={style.pc_lenovo_box}>
<div className={style.pc_lenovo_box_content}>
<div className={ style.pc_lenovo_box }>
<div className={style['pc_lenovo_box']}>
<div className={style["pc_lenovo_box"]}>
<div className="pc_lenovo_box">
<div className=" pc_lenovo_box ">
`
const replaceVar = 'style'
const resMap = new Map<string, string>()
const style_1 = 'flex flex-column'
const style_2 = 'mx-auto my-0 h-full'
resMap.set(".pc_lenovo_box", style_1)
resMap.set(".pc_lenovo_box .pc_lenovo_box_content", style_2)

// * ----------------------------------------------------------------

describe('Replace function', () => {
  it('should work', () => {
    const sortedMap = sortMapByKeyLength(resMap) as ATOM_MAP
    const newTemp = replace(template, sortedMap, replaceVar)
    expect(newTemp).toMatchInlineSnapshot(`
      "
      <div className={'flex flex-column'}>
      <div className={'flex flex-column'}>
      <div className={'mx-auto my-0 h-full'}>
      <div className={ 'flex flex-column' }>
      <div className={'flex flex-column'}>
      <div className={'flex flex-column'}>
      <div className=\\"pc_lenovo_box\\">
      <div className=\\" pc_lenovo_box \\">
      "
    `)
  })
})

/** replace regex(/.pc_lenovo_box/) will replace .pc_lenovo_box_content either */
describe('Why sort map by keys length', () => {
  it('should check the third line', () => {
    const newTemp = replace(template, resMap, replaceVar)
    expect(newTemp).toMatchInlineSnapshot(`
      "
      <div className={'flex flex-column'}>
      <div className={'flex flex-column'}>
      <div className={'flex flex-column'_content}>
      <div className={ 'flex flex-column' }>
      <div className={'flex flex-column'}>
      <div className={'flex flex-column'}>
      <div className=\\"pc_lenovo_box\\">
      <div className=\\" pc_lenovo_box \\">
      "
    `)
  })
})


