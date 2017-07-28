export class InvalidConfig extends Error {
    public confName: string;

    constructor(confName: string, msg: string) {
        super(msg);
        this.confName = confName;
    }
}

export class RequestError extends Error {
    public code: number;

    constructor(code: number, msg: string) {
        super(msg);
        this.code = code;
    }
}
