
import * as vscode from 'vscode';
import { Notes } from "../notes/notes";
import fs = require('fs');
import { extensionId } from '../global';
import { splitPathLast } from '../utils/stringUtils';

export class HeadNotes extends Notes{

    constructor(filePath:string){
        super(filePath);
        var extensionPath = vscode.extensions.getExtension(extensionId)?.extensionPath;
        extensionPath = extensionPath.replace(/\\/g, "/");
        var tempPath = extensionPath.concat("/configuration/templates");

        var hdNotesTemp = tempPath.concat("/hd-comments.temp");
        this.template = fs.readFileSync(hdNotesTemp, "utf-8");
    }

    addNotes(): void {
        console.log("addNotes");
        if(this.filePath && this.template){
            var sd = require('silly-datetime');
            var date = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
          
            var content = this.template;
            content = content.replace(/\$1/, "");

            if(content.indexOf("{date}") !== -1){
                content = content.replace(/\${date}/, date);
           }

            if(content.indexOf("{file_name}") !== -1){
                var fileName = splitPathLast(this.filePath);
                content = content.replace(/\${file_name}}/, fileName);
            }
           
            console.log("content------------:\r\n"+content);
            fs.writeFileSync(this.filePath, content);
        }
    }

}