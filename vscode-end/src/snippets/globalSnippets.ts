import { hdNotesProvider } from "./notesProvider";
import * as vscode from 'vscode';
import { languagesSupported } from "../global";


export class globalSnippets{

    languages = languagesSupported;

    constructor(context: vscode.ExtensionContext){
        let provider = new hdNotesProvider();
        let cppPv = vscode.languages.registerCompletionItemProvider(this.languages, provider);
        context.subscriptions.push(cppPv);
    }

}