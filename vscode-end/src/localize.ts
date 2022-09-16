import { resolve } from "path";
import fs = require('fs');
import * as vscode from 'vscode';
import { extensionId } from "./global";

interface ILanguagePack {
  [key: string]: string;
}
class CreateLocalize {
  options: { locale: any } | undefined;
  bundle: {[key:string]:string};
  constructor() {
    this.bundle = this.resolveLanguagePack();
  }

  private resolveLanguagePack(): ILanguagePack {
    this.init();
    const languageFormat = "package.nls{0}.json";
    const defaultLanguage = languageFormat.replace("{0}", "");

    const rootPath = String(vscode.extensions.getExtension(extensionId)?.extensionPath);

    const resolvedLanguage = this.recurseCandidates(
      rootPath,
      languageFormat,
      //@ts-ignore
      this.options.locale
    );

    const languageFilePath = resolve(rootPath, resolvedLanguage);

    try {
      const defaultLanguageBundle = JSON.parse(
        resolvedLanguage !== defaultLanguage
          ? fs.readFileSync(resolve(rootPath, defaultLanguage), "utf-8")
          : "{}"
      );

      const resolvedLanguageBundle = JSON.parse(
        fs.readFileSync(languageFilePath, "utf-8")
      );

      return { ...defaultLanguageBundle, ...resolvedLanguageBundle };
    } catch (err) {
      throw err;
    }
  }
  private init() {
    try {
      this.options = {
        ...this.options,
        ...JSON.parse(process.env.VSCODE_NLS_CONFIG || "{}"),
      };
    } catch (err) {
      throw err;
    }
  }

  private recurseCandidates(
    rootPath: string,
    format: string,
    candidate: string
  ): string {
    const filename = format.replace("{0}", `.${candidate}`);
    const filepath = resolve(rootPath, filename);
    if (fs.existsSync(filepath)) {
      return filename;
    }
    if (candidate.split("-")[0] !== candidate) {
      return this.recurseCandidates(rootPath, format, candidate.split("-")[0]);
    }
    return format.replace("{0}", "");
  }

  public localize(key: string, ...args: string[]): string {
    const message = this.bundle[key] || key;
    return this.format(message, args);
  }

  private format(message: string, args: string[] = []): string {
    return args.length
      ? message.replace(
          /\{(\d+)\}/g,
          (match, rest: any[]) => args[rest[0]] || match
        )
      : message;
  }
}

export const localize = (function(){
  let localize:{localize:Function} | null = null;

  return function (key: string){
    if(!localize) {
      localize = new CreateLocalize();
    }
    return localize.localize(key);
  };
})();
