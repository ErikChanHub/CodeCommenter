import * as vscode from 'vscode';
import { languagesSuffixSupported } from '../global';
import { HeadNotes } from '../headnotes/headnotes';

export class globalMonitor{

    constructor(){
        this.onFileCreate();
        this.onKeyEnter();
    }

    private onFileCreate() : void{
        vscode.workspace.onDidCreateFiles(event =>{
            var files = event.files;
            for (var f of files){
                console.log(f.path);
                var index = f.path.lastIndexOf(".");
                var suffix = f.path.substring(index+1, f.path.length);
                if(languagesSuffixSupported.indexOf(suffix) >= 0){
                    var note = new HeadNotes(f.path);
                    note.addNotes();
                }
            }
        });
    }

    private onKeyEnter(){
        vscode.workspace.onDidChangeTextDocument(event =>{
            // console.log(event);
        });
    }

}