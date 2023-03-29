import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { getOCtoACRelation } from './core'
import { replace } from './core/replace'
import { getCssFilePathFromFile } from './utils'

// * ---------------------------------------------------------------- const

const INFO_PREFIX = 'Atom Transform'

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
      // /Users/xlcause/Desktop/lenovo/tezign-intelligence-frontend-api/webpack/base.js
      /** 1. Get current file stream */
      const currentFilePath = activeEditor.document.uri.fsPath

      /** 2. Search scss/css files (multi?) and save the import var */
      const fileStream = fs.readFileSync(currentFilePath, 'utf-8')
      const [v = '', p] = getCssFilePathFromFile(fileStream)

      /** Do not support import './xx.scss' in this version */
      if (!v) {
        vscode.window.showErrorMessage(`${INFO_PREFIX}: Not supporting "import './xx.scss'"`)
        return false
      }

      const cssPath = p && path.normalize(path.resolve(path.dirname(currentFilePath), p))
      // vscode.window.showInformationMessage(`${INFO_PREFIX}: Current css file path: ${cssPath}`)
      // return false;
      if (!cssPath) {
        vscode.window.showErrorMessage(`${INFO_PREFIX}: No css file detected`)
        return false
      }
      else {
        const map = await getOCtoACRelation(cssPath)
        const newTemplate = replace(fileStream, map, v)
        // write to current file
        replaceCurrentFileContent(newTemplate)
        // vscode.window.showInformationMessage(`tempalte: ${newTemplate}`)
        // vscode.window.showInformationMessage(`Map k: ${map.get('.share')}`)
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
