// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { globalMonitor } from './monitor/globalMonitor';
import { globalSnippets } from './snippets/globalSnippets';
import { codeNotesWebview } from './webview/codeNotesWebview';
import fs = require('fs');
import { extensionId, flagMarkdown } from './global';
import { ActivationStatistics } from './statistics/ActivationStatistics';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codeCommenter" is now active!');

	var view = new codeNotesWebview(context);
	view.init();

	let createCommand = vscode.commands.registerCommand('codecommenter.templates', () => {
		vscode.commands.executeCommand('codecommenter.helloWorld');
	});
	context.subscriptions.push(createCommand);

	new globalMonitor();

	new globalSnippets(context);

	const extensionPath = vscode.extensions.getExtension(extensionId)?.extensionPath;
	const systemInfoFlag = fs.existsSync(extensionPath + flagMarkdown);
	statistics(systemInfoFlag);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function statistics(systemInfoFlag: any) {
	var activationStatistics = new ActivationStatistics(systemInfoFlag);
	activationStatistics.run();
}
