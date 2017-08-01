import {execute} from "./consumer";
import {InvalidConfig, RequestError} from "./exception";
import * as path from "./path";
import * as util from "./util";

export default class LAClient {
    public config: LAConfig.Config;

    constructor(config: LAConfig.Config) {
        const msg = "must not empty!!";
        if (!config.endpointUrl) {
            throw new InvalidConfig("endpointUrl", msg);
        }
        if (!config.organizationId) {
            throw new InvalidConfig("organizationId", msg);
        }
        if (!config.deploymentId) {
            throw new InvalidConfig("deploymentId", msg);
        }
        if (!config.buttonId) {
            throw new InvalidConfig("buttonId", msg);
        }
        if (!config.version) {
            throw new InvalidConfig("version", msg);
        }
        this.config = config;
    }

    public establish(): Promise<any> {
        const options = {
            uri: this.url(path.createSession),
            qs: {
                "SessionId.ClientType": "chasitor",
            },
            headers: {
                "X-LIVEAGENT-AFFINITY": "null",
                "X-LIVEAGENT-API-VERSION": this.config.version,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return this.execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public initial(header: LARequest.Header, payload: LARequest.ChasitorInit): Promise<boolean> {
        const options = {
            uri: this.url(path.chasitorInit),
            method: "POST",
            headers: {
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": header.sequence,
            },
            body: payload,
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options)
        .then((res) => {
            return res && res === "OK";
        }).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public resync(header: LARequest.Header): Promise<any> {
        const options = {
            uri: this.url(path.resyncSession) + "/" + header.sessionId,
            headers: {
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public resyncState(header: LARequest.Header, payload: LARequest.ChasitorResyncState): Promise<any> {
        const options = {
            uri: this.url(path.resyncSessionState),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
            },
            body: payload,
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public informNotTyping(header: LARequest.Header): Promise<any> {
        const options = {
            uri: this.url(path.chasitorNotTyping),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": header.sequence,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public sneakPeek(header: LARequest.Header, payload: LARequest.ChasitorSneakPeek): Promise<any> {
        const options = {
            uri: this.url(path.chasitorSneakPeek),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": header.sequence,
            },
            body: payload,
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public informTyping(header: LARequest.Header): Promise<any> {
        const options = {
            uri: this.url(path.chasitorTyping),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": header.sequence,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public informEnd(header: LARequest.Header, sequence: number): Promise<any> {
        const options = {
            uri: this.url(path.chatEnd),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": sequence || 0,
            },
            body: {
                reason: "client",
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public informMessage(header: LARequest.Header, cmessage: LARequest.ChatMessage): Promise<any> {
        const options = {
            uri: this.url(path.chatMessage),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": header.sequence,
            },
            body: cmessage,
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public informCustomEvent(header: LARequest.Header, cevent: LARequest.CustomEvent): Promise<any> {
        const options = {
            uri: this.url(path.customEvent),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
                "X-LIVEAGENT-SEQUENCE": header.sequence,
            },
            body: cevent,
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public getMessages(header: LARequest.Header, ackNum: string): Promise<any> {
        const options = {
            uri: this.url(path.messages),
            qs: {
                ack: ackNum,
            },
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version || header.version,
                "X-LIVEAGENT-AFFINITY": header.affinity || "null",
                "X-LIVEAGENT-SESSION-KEY": header.sessionKey,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public getSetting(): Promise<any> {
        const options = {
            uri: this.url(path.settings),
            qs: {
                "org_id": this.config.organizationId,
                "deployment_id": this.config.deploymentId,
                "Settings.buttonIds": this.config.buttonId,
            },
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).then((res) => {
            return res.messages[0].message || "";
        })
        .catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public getStatus(): Promise<boolean> {
        const options = {
            uri: this.url(path.availability),
            qs: {
                "org_id": this.config.organizationId,
                "deployment_id": this.config.deploymentId,
                "Availability.ids": this.config.buttonId,
            },
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).then((res) => {
            return res.messages[0].message.results[0].isAvailable || false;
        }).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public setBreadCrumb(breadCrumb: LARequest.Breadcrumb): Promise<any> {
        const options = {
            uri: this.url(path.breadCrumb),
            method: "POST",
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version,
            },
            body: breadCrumb,
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    public getVisitor(): Promise<any> {
        const options = {
            uri: this.url(path.visitorId),
            qs: {
                org_id: this.config.organizationId,
                deployment_id: this.config.deploymentId,
            },
            headers: {
                "X-LIVEAGENT-API-VERSION": this.config.version,
            },
            json: true,
            proxy: this.config.proxy,
        };
        return execute(options).catch((err) => {
            throw new RequestError(err.statusCode, err.message);
        });
    }

    private execute(opt: any): Promise<any> {
        return execute(opt);
    }

    private url(cpath: string): string {
        return this.config.endpointUrl + cpath;
    }
}
