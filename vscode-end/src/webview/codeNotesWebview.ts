import * as vscode from 'vscode';
import { extensionId } from '../global';
import { localize } from '../localize';
const fs = require('fs');
const path = require('path');

export class CodeNotesWebview {

    context: vscode.ExtensionContext;

    constructor(context1: vscode.ExtensionContext) {
        this.context = context1;
    }

    init(): void {
        var extensionPath = vscode.extensions.getExtension(extensionId)?.extensionPath;
        extensionPath = extensionPath.replace(/\\/g, "/");
        var tempPath = extensionPath.concat("/configuration/templates");

        let webview = vscode.commands.registerCommand('codecommenter.helloWorld', () => {
            const panel = vscode.window.createWebviewPanel(
                'templatesSettings',
                localize("codeCommenter.comments_settings"),
                vscode.ViewColumn.One,
                {
                    enableScripts: true, // 启用JS，默认禁用
                    retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
                    // localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, "media"))],
                }
            );
            panel.iconPath = vscode.Uri.file(path.join(this.context.extensionPath, "images/logo.png"));
            panel.webview.html = getWebViewContent(this.context, panel, "web/template-settings", "index.html");

            var hdNotesTemp = tempPath.concat("/hd-comments.temp");
            var hdNotes = fs.readFileSync(hdNotesTemp, "utf-8");
            var funNotesTemp = tempPath.concat("/fun-comments.temp");
            var funNotes = fs.readFileSync(funNotesTemp, "utf-8");
            var lan = vscode.env.language;
            panel.webview.postMessage({
                hdNotes: hdNotes,
                funNotes: funNotes,
                themeKind: vscode.window.activeColorTheme.kind,
                language: lan,
            });

            panel.webview.onDidReceiveMessage(message => {
                var content = message.text;
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: localize("codeCommenter.progress.apply.template"),
                    cancellable: true
                }, (progress, token) => {
                    token.onCancellationRequested(() => {
                        // vscode.debug.stopDebugging();
                    });
                    const p = new Promise<void>(async resolve => {
                        switch (message.command) {
                            case 'applyHd':
                                fs.writeFileSync(tempPath.concat("/hd-comments.temp"), content);
                                break;
                            case 'applyFun':
                                fs.writeFileSync(tempPath.concat("/fun-comments.temp"), content);
                                break;

                        }
                        resolve();
                    });
                    return p;
                });
            }, undefined, this.context.subscriptions);

        });

        this.context.subscriptions.push(webview);

    }

}

/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
function getWebViewContent(context, panel, templatePath, fileName) {
    let srcPath = path.join(context.extensionPath, templatePath);

    const srcPathUri = vscode.Uri.file(srcPath);
    const baseUri = panel.webview.asWebviewUri(srcPathUri);
    const indexPath = path.join(srcPath, fileName);
    let indexHtml = fs.readFileSync(indexPath, "utf8");
    indexHtml = `<base href="${String(baseUri)}/">` + indexHtml;
    return indexHtml;
}
