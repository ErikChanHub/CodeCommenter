import * as vscode from 'vscode';
import { extensionId } from '../global';
import { localize } from '../localize';
import { splitPathLast } from '../utils/stringUtils';
const fs = require('fs');

export class hdNotesProvider implements vscode.CompletionItemProvider {

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.CompletionItem[] {    
    var completionItems = [];
    completionItems.push(newItem("hd-comments", localize('codeCommenter.editor.add_hd_comments'), document.fileName));
    completionItems.push(newItem("fun-comments", localize('codeCommenter.editor.add_fun_comments'), document.fileName));
    return completionItems;
  }

  public resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): any {
    return item;
  }

  dispose() {

  }

}
/**
 * 添加一个新的菜单
 * @param type 
 * @param msg 
 * @returns 
 */
function newItem(type: string, msg: string, filepath) {
  var extensionPath = vscode.extensions.getExtension(extensionId)?.extensionPath;
  extensionPath = extensionPath.replace(/\\/g, "/");
  var tempPath = extensionPath.concat("/configuration/templates");

  var sd = require('silly-datetime');
  var date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

  var hdNotesTemp = tempPath.concat("/", type, ".temp");
  var content = fs.readFileSync(hdNotesTemp, "utf-8");

  if(content.indexOf("{date}") !== -1){
    content = content.replace(/\${date}/, date);
  }

  if(content.indexOf("{file_name}") !== -1){
    var fileName = splitPathLast(filepath.replace(/\\/g, "/"));
    content = content.replace(/\${file_name}}/, fileName);
  }
 
  var item = new vscode.CompletionItem(msg);
  item.kind = vscode.CompletionItemKind.Snippet;
  item.detail = msg;
  item.filterText = type;
  item.insertText = new vscode.SnippetString(content);
  return item;
}