export interface Config {
    autoSave: "true" | "false",
    defaultFilenamePrefix: string,
    language: string,
    [key: string]: any;
}
