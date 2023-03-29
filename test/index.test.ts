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
      <div className={'mx-auto my-0 flex flex-column h-full'} style={{ ...style }}>
      <div className={'flex justify-between items-center mb-14'} style={{ ...style }}>
      <div className={'flex-1 bg-left-bottom bg-bottom underline color-[rgb(231,229,228)] color-[#eee] color-[red] tracking-[-0.025em] font-weight-[200] not-italic text-[14px] p-0 px-1 py-0 mt-0 mb-2 mr-1 pt-0 pb-2 pr-1 pl-3 pl-[-99px] justify-items-start justify-between flex-1 flex-column object-right-bottom columns-1 flex flow-root break-before-all overflow-x-auto break-after-auto'} style={{ ...style }}>
      <div className={'flex-1 bg-left-bottom bg-bottom underline color-[rgb(231,229,228)] color-[#eee] color-[red] tracking-[-0.025em] font-weight-[200] not-italic text-[14px] p-0 px-1 py-0 mt-0 mb-2 mr-1 pt-0 pb-2 pr-1 pl-3 pl-[-99px] justify-items-start justify-between flex-1 flex-column object-right-bottom columns-1 flex flow-root break-before-all overflow-x-auto break-after-auto'} style={{ ...style }}>
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
        ".test" => "flex-1 bg-left-bottom bg-bottom underline color-[rgb(231,229,228)] color-[#eee] color-[red] tracking-[-0.025em] font-weight-[200] not-italic text-[14px] p-0 px-1 py-0 mt-0 mb-2 mr-1 pt-0 pb-2 pr-1 pl-3 pl-[-99px] justify-items-start justify-between flex-1 flex-column object-right-bottom columns-1 flex flow-root break-before-all overflow-x-auto break-after-auto",
        ".pc_lenovo_box" => "mx-auto my-0 flex flex-column h-full",
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-bar" => "mb-8",
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-content" => "flex-[1] h-0",
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-tabpane" => "h-full flex flex-column",
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-tabpane .spin-wrap,.pc_lenovo_box .pc_lenovo_box_content .ant-tabs-tabpane .spin-container" => "overflow-hidden flex flex-column flex-[1]",
        ".readiness-action-header" => "flex justify-between items-center mb-14",
        ".readiness-status-info" => "flex-[1] ml-16 px-0 py-4",
        ".readiness-status-info .readiness-status-info__container" => "pl-12  color-[#4e483d]",
        ".readiness-status-info .readiness-status-info__item" => "inline-flex items-center mr-12 text-[12px] leading-[12] ",
        ".readiness-status-popover__desc" => "w-220 text-[12px]",
        ".readiness-status-popover__desc .readiness-status-popover__light--green" => "color-[#2ed1b9]",
        ".readiness-status-popover__desc .readiness-status-popover__light--red" => "color-[#f9434d]",
        ".readiness-status-popover__desc .readiness-status-popover__light--yellow" => "color-[#ffa730]",
        ".readiness-status-circle" => "inline-block w-10 h-10 rounded-[50%] align-middle",
        ".readiness-status-circle--large" => "w-18 h-18",
        ".readiness-status-circle--green" => "",
        ".readiness-status-circle--yellow" => "",
        ".readiness-status-circle--red" => "",
        ".readiness-status-circle--gray" => "",
        ".readiness-status-circle--empty" => " ",
        ".readiness-status-action .readiness-status-action__item-dropdown" => "none h-52",
        ".readiness-status-action:hover .readiness-status-action__item" => "none",
        ".readiness-status-action:hover .readiness-status-action__item-dropdown" => "flex justify-center items-center w-68 h-52 absolute top-50% left-50% ",
        ".readiness-status-action__item" => "min-w-68 min-h-52 mx-auto my--10 flex justify-center items-center",
        ".readiness-status-action__item--green" => "mx-0 my--16 ",
        ".readiness-status-action__item--green:hover" => "",
        ".readiness-status-action__item-button" => "relative w-68 h-30 color-[#e6ebf0] p-0 ",
        ".readiness-status-action__item-button:hover" => "w-68 h-30 border-[#e6ebf0] color-[#e6ebf0]",
        ".readiness-status-action__item-button-container" => "min-w-68",
        ".readiness-status-action__item-icon" => "absolute top-8 right-5",
        ".readiness-table-footer" => "mx-0 my--12",
        ".readiness-table-footer:hover" => "color-[\\"black\\"]",
        ".readiness-table" => "mb-20",
        ".readiness-table .readiness-table__edit-btn" => "",
        ".readiness-table .readiness-table__edit-btn:hover" => "color-[\\"black\\"]",
        ".readiness-table :global .tzui-table-wrapper" => "",
        ".readiness-table :global .tzui-table-footer" => "",
        ".readiness-table :global .tzui-table-thead>tr>th" => "px-16 py-8",
        ".cell_text" => " overflow-hidden  text-ellipsis -webkit-box ",
      }
    `)
  })
})

describe('Get css 「property - value」 map', () => {
  it('should work', async () => {
    const cssMap = await transformToCssMapFromFile(cssFile)
    expect(cssMap).toMatchInlineSnapshot(`
      Map {
        ".test" => [
          [
            "flex",
            "1 1 0%",
          ],
          [
            "background-position",
            "left bottom",
          ],
          [
            "background-position",
            "bottom",
          ],
          [
            "text-decoration-line",
            "underline",
          ],
          [
            "color",
            "rgb(231,229,228)",
          ],
          [
            "color",
            "#eee",
          ],
          [
            "color",
            "red",
          ],
          [
            "letter-spacing",
            "-0.025em",
          ],
          [
            "font-weight",
            "200",
          ],
          [
            "font-style",
            "normal",
          ],
          [
            "font-size",
            "14px",
          ],
          [
            "padding",
            "0",
          ],
          [
            "padding",
            "0 1px",
          ],
          [
            "margin",
            "0 1px 2px",
          ],
          [
            "padding",
            "0 1px 2px 3px",
          ],
          [
            "padding-left",
            "-99px",
          ],
          [
            "justify-items",
            "start",
          ],
          [
            "justify-content",
            "space-between",
          ],
          [
            "flex",
            "1 1 0%",
          ],
          [
            "flex-direction",
            "column",
          ],
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
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-bar" => [
          [
            "margin-bottom",
            "8px",
          ],
        ],
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-content" => [
          [
            "flex",
            "1",
          ],
          [
            "height",
            "0",
          ],
        ],
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-tabpane" => [
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
        ".pc_lenovo_box .pc_lenovo_box_content .ant-tabs-tabpane .spin-wrap,.pc_lenovo_box .pc_lenovo_box_content .ant-tabs-tabpane .spin-container" => [
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
      ".test {
        flex: 1 1 0%;
        background-position: left bottom;
        background-position: bottom;
        text-decoration-line: underline;
        color: rgb(231 229 228);
        color: #eee;
        color: red;
        letter-spacing: -0.025em;
        font-weight: 200;
        font-style: normal;
        font-size: 14px;
        padding: 0;
        padding: 0 1px;
        margin: 0 1px 2px;
        padding: 0 1px 2px 3px;
        padding-left: -99px;
        justify-items: start;
        justify-content: space-between;
        flex: 1 1 0%;
        flex-direction: column;
        object-position: right bottom;
        columns: 1;
        display: flex;
        display: flow-root;
        break-before: all;
        overflow-x: auto;
        break-after: auto;
      }

      .pc_lenovo_box {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        height: 100%;

        .pc_lenovo_box_content {
          // 缩短顶部间距
          .ant-tabs-bar {
            margin-bottom: 8px;
          }

          .ant-tabs-content {
            flex: 1;
            height: 0;
          }

          .ant-tabs-tabpane {
            height: 100%;
            display: flex;
            flex-direction: column;

            .spin-wrap,
            .spin-container {
              overflow: hidden;
              display: flex;
              flex-direction: column;
              flex: 1;
            }
          }
        }
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
