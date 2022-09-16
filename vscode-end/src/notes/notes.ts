import { INotes } from "./INotes";

export class Notes implements INotes{

    template? : string;
    filePath? : string;

    constructor(filePath:string){
        if(filePath.startsWith("/")){
            filePath = filePath.replace("/", "");
        }
        this.filePath = filePath;
    }


    addNotes(): void {
        throw new Error("Method not implemented.");
    }

}