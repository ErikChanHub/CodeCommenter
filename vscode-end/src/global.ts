
export const extensionId = "erikchan.code-commenter";
export const languagesSupported = [
    "c", "java", "go", "typescript", "javascript", "c++", "python"
];

export const languagesSuffixSupported = [
    "c", "java", "go", "ts", "js", "cpp", "py"
];

export const flagMarkdown = "/../code-commenter.md";

export const enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
}

// 请填写您自己的服务器
export const REMOTE_SERVER_URL = 'http://localhost:9090/statistics/';
