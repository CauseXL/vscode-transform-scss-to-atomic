import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { ATOM_MAP, getOCtoACRelation } from './core'
import { replace, replaceCssVariable } from './core/replace'
import { getCssFilePathFromFile, sortMapByKeyLength } from './utils'

// * ---------------------------------------------------------------- const

export const INFO_PREFIX = 'Atom Transform'

/**
 * 1. Get current user active file stream
 * 2. Search scss/css files (multi?) and save the import var
 * 3. main function => return Map<className, atomClass>
 * 4. replace var.[className] with atomClass
 * 5. error handle
 */
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.transform', async () => {
    const activeEditor = vscode.window.activeTextEditor
    if (activeEditor) {
      /** 1. Get current file stream */
      const currentFilePath = activeEditor.document.uri.fsPath
      vscode.window.showInformationMessage(`${INFO_PREFIX}: Transforming...`)

      /** 2. Search scss/css files (multi?) and save the import var */
      const fileStream = fs.readFileSync(currentFilePath, 'utf-8')
      const [v = '', p] = getCssFilePathFromFile(fileStream)
      const cssPath = p && path.normalize(path.resolve(path.dirname(currentFilePath), p))

      if (!cssPath) {
        vscode.window.showErrorMessage(`${INFO_PREFIX}: No css file detected`)
        return false
      }
      else {
        try {
          /** Do not support import './xx.scss' in this version */
          if (!v) {
            vscode.window.showErrorMessage(`${INFO_PREFIX}: Not supporting "import './xx.scss'"`)
            return false
          }
          const backupPath = replaceCssVariable(cssPath)
          const map = await getOCtoACRelation(backupPath)
          /** check replace.test.ts describe: Why sort map by keys length  */
          const sortedMap = sortMapByKeyLength(map) as ATOM_MAP
          const newTemplate = replace(fileStream, sortedMap, v)

          replaceCurrentFileContent(newTemplate)
          fs.unlinkSync(backupPath);
        } catch (e: any) {
          if (e?.formatted.includes('Undefined variable'))
            vscode.window.showErrorMessage(`${INFO_PREFIX}: scss variable not supported for this version`)
        }
      }
    }
    else {
      vscode.window.showErrorMessage(`${INFO_PREFIX}: No active editor found.`)
    }
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {

}

// * ---------------------------------------------------------------- util

function replaceCurrentFileContent(newContent: string) {
  const editor = vscode.window.activeTextEditor
  if (!editor)
    return
  const document = editor.document
  const workspaceEdit = new vscode.WorkspaceEdit()
  workspaceEdit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), newContent)
  vscode.workspace.applyEdit(workspaceEdit)
    .then(() => {
      vscode.window.showInformationMessage(`${INFO_PREFIX}: File replaced successfully!`)
    }, (err) => {
      vscode.window.showErrorMessage(`Error replacing file: ${err.message}`)
    })
}
