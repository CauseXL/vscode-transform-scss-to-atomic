import { join } from 'path'
import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'
import { getOCtoACRelation } from '../src/core'
import { replace } from '../src/core/replace'
import { transformToCssMapFromFile } from '../src/core/transform'

// * ----------------------------------------------------------------

const cssFile = join(__dirname, './test.scss')
const cssStrFromFile = readFileSync(cssFile, 'utf8')

const template = `
<div className={style.pc_lenovo_box} style={{ ...style }}>
<div className={style.readiness-action-header} style={{ ...style }}>
<div className={style.test} style={{ ...style }}>
<div className={style['test']} style={{ ...style }}>
</div>
`

// * ----------------------------------------------------------------

describe('main function', () => {
  it(' work', async () => {
    const map = await getOCtoACRelation(cssFile)
    const data = replace(template, map, 'style')
    expect(data).toMatchInlineSnapshot(`
      "
      <div className={' flex  '} style={{ ...style }}>
      <div className={'flex   '} style={{ ...style }}>
      <div className={'object-right-bottom columns-1 flex flow-root break-before-all overflow-x-auto break-after-auto'} style={{ ...style }}>
      <div className={'object-right-bottom columns-1 flex flow-root break-before-all overflow-x-auto break-after-auto'} style={{ ...style }}>
      </div>
      "
    `)
  })
})

describe('Get 「origin -> atom」 map', () => {
  it('should work', async () => {
    const res = await getOCtoACRelation(cssFile)
    expect(res).toMatchInlineSnapshot(`
      Map {
        ".pc_lenovo_box" => " flex  ",
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-bar" => "",
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-content" => " ",
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane" => " flex ",
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane .spin-wrap,.pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane .spin-container" => "overflow-hidden flex  ",
        ".test" => "object-right-bottom columns-1 flex flow-root break-before-all overflow-x-auto break-after-auto",
        ".readiness-action-header" => "flex   ",
        ".readiness-status-info" => "  ",
        ".readiness-status-info .readiness-status-info__container" => "  ",
        ".readiness-status-info .readiness-status-info__item" => "inline-flex     ",
        ".readiness-status-popover__desc" => " ",
        ".readiness-status-popover__desc .readiness-status-popover__light--green" => "",
        ".readiness-status-popover__desc .readiness-status-popover__light--red" => "",
        ".readiness-status-popover__desc .readiness-status-popover__light--yellow" => "",
        ".readiness-status-circle" => "inline-block    ",
        ".readiness-status-circle--large" => " ",
        ".readiness-status-circle--green" => "",
        ".readiness-status-circle--yellow" => "",
        ".readiness-status-circle--red" => "",
        ".readiness-status-circle--gray" => "",
        ".readiness-status-circle--empty" => " ",
        ".readiness-status-action .readiness-status-action__item-dropdown" => "none ",
        ".readiness-status-action:hover .readiness-status-action__item" => "none",
        ".readiness-status-action:hover .readiness-status-action__item-dropdown" => "flex     absolute top-50% left-50% ",
        ".readiness-status-action__item" => "   flex  ",
        ".readiness-status-action__item--green" => " ",
        ".readiness-status-action__item--green:hover" => "",
        ".readiness-status-action__item-button" => "relative     ",
        ".readiness-status-action__item-button:hover" => "   ",
        ".readiness-status-action__item-button-container" => "",
        ".readiness-status-action__item-icon" => "absolute top-8 right-5",
        ".readiness-table-footer" => "",
        ".readiness-table-footer:hover" => "",
        ".readiness-table" => "",
        ".readiness-table .readiness-table__edit-btn" => "",
        ".readiness-table .readiness-table__edit-btn:hover" => "",
        ".readiness-table :global .tzui-table-wrapper" => "",
        ".readiness-table :global .tzui-table-footer" => "",
        ".readiness-table :global .tzui-table-thead>tr>th" => "",
        ".cell_text" => " overflow-hidden   -webkit-box ",
      }
    `)
  })
})

describe('Get css 「property - value」 map', () => {
  it('should work', async () => {
    const cssMap = await transformToCssMapFromFile(cssFile)
    expect(cssMap).toMatchInlineSnapshot(`
      Map {
        ".pc_lenovo_box" => [
          [
            "margin",
            "0 auto",
          ],
          [
            "display",
            "flex",
          ],
          [
            "flex-direction",
            "column",
          ],
          [
            "height",
            "100%",
          ],
        ],
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-bar" => [
          [
            "margin-bottom",
            "8px",
          ],
        ],
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-content" => [
          [
            "flex",
            "1",
          ],
          [
            "height",
            "0",
          ],
        ],
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane" => [
          [
            "height",
            "100%",
          ],
          [
            "display",
            "flex",
          ],
          [
            "flex-direction",
            "column",
          ],
        ],
        ".pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane .spin-wrap,.pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane .spin-container" => [
          [
            "overflow",
            "hidden",
          ],
          [
            "display",
            "flex",
          ],
          [
            "flex-direction",
            "column",
          ],
          [
            "flex",
            "1",
          ],
        ],
        ".test" => [
          [
            "object-position",
            "right bottom",
          ],
          [
            "columns",
            "1",
          ],
          [
            "display",
            "flex",
          ],
          [
            "display",
            "flow-root",
          ],
          [
            "break-before",
            "all",
          ],
          [
            "overflow-x",
            "auto",
          ],
          [
            "break-after",
            "auto",
          ],
        ],
        ".readiness-action-header" => [
          [
            "display",
            "flex",
          ],
          [
            "justify-content",
            "space-between",
          ],
          [
            "align-items",
            "center",
          ],
          [
            "margin-bottom",
            "14px",
          ],
        ],
        ".readiness-status-info" => [
          [
            "flex",
            "1",
          ],
          [
            "margin-left",
            "16px",
          ],
          [
            "padding",
            "4px 0px",
          ],
        ],
        ".readiness-status-info .readiness-status-info__container" => [
          [
            "padding-left",
            "12px",
          ],
          [
            "border-left",
            "1px solid #dce1e5",
          ],
          [
            "color",
            "#4e483d",
          ],
        ],
        ".readiness-status-info .readiness-status-info__item" => [
          [
            "display",
            "inline-flex",
          ],
          [
            "align-items",
            "center",
          ],
          [
            "margin-right",
            "12px",
          ],
          [
            "font-size",
            "12px",
          ],
          [
            "line-height",
            "12px",
          ],
          [
            "cursor",
            "pointer",
          ],
        ],
        ".readiness-status-popover__desc" => [
          [
            "width",
            "220px",
          ],
          [
            "font-size",
            "12px",
          ],
        ],
        ".readiness-status-popover__desc .readiness-status-popover__light--green" => [
          [
            "color",
            "#2ed1b9",
          ],
        ],
        ".readiness-status-popover__desc .readiness-status-popover__light--red" => [
          [
            "color",
            "#f9434d",
          ],
        ],
        ".readiness-status-popover__desc .readiness-status-popover__light--yellow" => [
          [
            "color",
            "#ffa730",
          ],
        ],
        ".readiness-status-circle" => [
          [
            "display",
            "inline-block",
          ],
          [
            "width",
            "10px",
          ],
          [
            "height",
            "10px",
          ],
          [
            "border-radius",
            "50%",
          ],
          [
            "vertical-align",
            "middle",
          ],
        ],
        ".readiness-status-circle--large" => [
          [
            "width",
            "18px",
          ],
          [
            "height",
            "18px",
          ],
        ],
        ".readiness-status-circle--green" => [
          [
            "background",
            "#2ed1b9",
          ],
        ],
        ".readiness-status-circle--yellow" => [
          [
            "background",
            "#ffa730",
          ],
        ],
        ".readiness-status-circle--red" => [
          [
            "background",
            "#f9434d",
          ],
        ],
        ".readiness-status-circle--gray" => [
          [
            "background",
            "#d3d7db",
          ],
        ],
        ".readiness-status-circle--empty" => [
          [
            "background",
            "white",
          ],
          [
            "border",
            "1px solid #d3d7db",
          ],
        ],
        ".readiness-status-action .readiness-status-action__item-dropdown" => [
          [
            "display",
            "none",
          ],
          [
            "height",
            "52px",
          ],
        ],
        ".readiness-status-action:hover .readiness-status-action__item" => [
          [
            "display",
            "none",
          ],
        ],
        ".readiness-status-action:hover .readiness-status-action__item-dropdown" => [
          [
            "display",
            "flex",
          ],
          [
            "justify-content",
            "center",
          ],
          [
            "align-items",
            "center",
          ],
          [
            "width",
            "68px",
          ],
          [
            "height",
            "52px",
          ],
          [
            "position",
            "absolute",
          ],
          [
            "top",
            "50%",
          ],
          [
            "left",
            "50%",
          ],
          [
            "transform",
            "translate(-50%,-50%)",
          ],
        ],
        ".readiness-status-action__item" => [
          [
            "min-width",
            "68px",
          ],
          [
            "min-height",
            "52px",
          ],
          [
            "margin",
            "-10px auto",
          ],
          [
            "display",
            "flex",
          ],
          [
            "justify-content",
            "center",
          ],
          [
            "align-items",
            "center",
          ],
        ],
        ".readiness-status-action__item--green" => [
          [
            "margin",
            "-16px 0",
          ],
          [
            "cursor",
            "pointer",
          ],
        ],
        ".readiness-status-action__item--green:hover" => [
          [
            "background",
            "linear-gradient(0deg,rgba(78,72,61,0.28),rgba(78,72,61,0.28)),#fff",
          ],
        ],
        ".readiness-status-action__item-button" => [
          [
            "position",
            "relative",
          ],
          [
            "width",
            "68px",
          ],
          [
            "height",
            "30px",
          ],
          [
            "color",
            "#e6ebf0",
          ],
          [
            "padding",
            "0",
          ],
          [
            "box-shadow",
            "none",
          ],
        ],
        ".readiness-status-action__item-button:hover" => [
          [
            "width",
            "68px",
          ],
          [
            "height",
            "30px",
          ],
          [
            "border-color",
            "#e6ebf0",
          ],
          [
            "color",
            "#e6ebf0",
          ],
        ],
        ".readiness-status-action__item-button-container" => [
          [
            "min-width",
            "68px",
          ],
        ],
        ".readiness-status-action__item-icon" => [
          [
            "position",
            "absolute",
          ],
          [
            "top",
            "8px",
          ],
          [
            "right",
            "5px",
          ],
        ],
        ".readiness-table-footer" => [
          [
            "margin",
            "-12px 0",
          ],
        ],
        ".readiness-table-footer:hover" => [
          [
            "color",
            "\\"black\\"",
          ],
        ],
        ".readiness-table" => [
          [
            "margin-bottom",
            "20px",
          ],
        ],
        ".readiness-table .readiness-table__edit-btn" => [
          [
            "cursor",
            "pointer",
          ],
        ],
        ".readiness-table .readiness-table__edit-btn:hover" => [
          [
            "color",
            "\\"black\\"",
          ],
        ],
        ".readiness-table :global .tzui-table-wrapper" => [
          [
            "border-top",
            "2px solid #eceeef",
          ],
        ],
        ".readiness-table :global .tzui-table-footer" => [
          [
            "background",
            "white",
          ],
        ],
        ".readiness-table :global .tzui-table-thead>tr>th" => [
          [
            "padding",
            "8px 16px",
          ],
        ],
        ".cell_text" => [
          [
            "word-break",
            "break-all",
          ],
          [
            "overflow",
            "hidden",
          ],
          [
            "-webkit-line-clamp",
            "2",
          ],
          [
            "text-overflow",
            "ellipsis",
          ],
          [
            "display",
            "-webkit-box",
          ],
          [
            "-webkit-box-orient",
            "vertical",
          ],
        ],
      }
    `)
  })
})

describe('exported css', () => {
  it('should work', () => {
    expect(cssStrFromFile).toMatchInlineSnapshot(`
      ".pc_lenovo_box {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .pc_lenovo_box .pc_lenovo_content_box .ant-tabs-bar {
        margin-bottom: 8px;
      }
      .pc_lenovo_box .pc_lenovo_content_box .ant-tabs-content {
        flex: 1;
        height: 0;
      }
      .pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane .spin-wrap,
      .pc_lenovo_box .pc_lenovo_content_box .ant-tabs-tabpane .spin-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .test {
        object-position: right bottom;
        columns: 1;
        display: flex;
        display: flow-root;
        break-before: all;
        overflow-x: auto;
        break-after: auto;
      }

      .readiness-action-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
      }

      .readiness-status-info {
        flex: 1;
        margin-left: 16px;
        padding: 4px 0px;
      }
      .readiness-status-info .readiness-status-info__container {
        padding-left: 12px;
        border-left: 1px solid #dce1e5;
        color: #4e483d;
      }
      .readiness-status-info .readiness-status-info__item {
        display: inline-flex;
        align-items: center;
        margin-right: 12px;
        font-size: 12px;
        line-height: 12px;
        cursor: pointer;
      }

      .readiness-status-popover__desc {
        width: 220px;
        font-size: 12px;
      }
      .readiness-status-popover__desc .readiness-status-popover__light--green {
        color: #2ed1b9;
      }
      .readiness-status-popover__desc .readiness-status-popover__light--red {
        color: #f9434d;
      }
      .readiness-status-popover__desc .readiness-status-popover__light--yellow {
        color: #ffa730;
      }

      .readiness-status-circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        vertical-align: middle;
      }

      .readiness-status-circle--large {
        width: 18px;
        height: 18px;
      }

      .readiness-status-circle--green {
        background: #2ed1b9;
      }

      .readiness-status-circle--yellow {
        background: #ffa730;
      }

      .readiness-status-circle--red {
        background: #f9434d;
      }

      .readiness-status-circle--gray {
        background: #d3d7db;
      }

      .readiness-status-circle--empty {
        background: white;
        border: 1px solid #d3d7db;
      }

      .readiness-status-action .readiness-status-action__item-dropdown {
        display: none;
        height: 52px;
      }
      .readiness-status-action:hover .readiness-status-action__item {
        display: none;
      }
      .readiness-status-action:hover .readiness-status-action__item-dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 68px;
        height: 52px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .readiness-status-action__item {
        min-width: 68px;
        min-height: 52px;
        margin: -10px auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .readiness-status-action__item--green {
        margin: -16px 0;
        cursor: pointer;
      }
      .readiness-status-action__item--green:hover {
        background: linear-gradient(0deg, rgba(78, 72, 61, 0.28), rgba(78, 72, 61, 0.28)), #fff;
      }

      .readiness-status-action__item-button {
        position: relative;
        width: 68px;
        height: 30px;
        color: #e6ebf0;
        padding: 0;
        box-shadow: none;
      }
      .readiness-status-action__item-button:hover {
        width: 68px;
        height: 30px;
        border-color: #e6ebf0;
        color: #e6ebf0;
      }

      .readiness-status-action__item-button-container {
        min-width: 68px;
      }

      .readiness-status-action__item-icon {
        position: absolute;
        top: 8px;
        right: 5px;
      }

      .readiness-table-footer {
        margin: -12px 0;
      }
      .readiness-table-footer:hover {
        color: \\"black\\";
      }

      .readiness-table {
        margin-bottom: 20px;
      }
      .readiness-table .readiness-table__edit-btn {
        cursor: pointer;
      }
      .readiness-table .readiness-table__edit-btn:hover {
        color: \\"black\\";
      }
      .readiness-table :global .tzui-table-wrapper {
        border-top: 2px solid #eceeef;
      }
      .readiness-table :global .tzui-table-footer {
        background: white;
      }
      .readiness-table :global .tzui-table-thead > tr > th {
        padding: 8px 16px;
      }

      .cell_text {
        word-break: break-all;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }"
    `)
  })
})
