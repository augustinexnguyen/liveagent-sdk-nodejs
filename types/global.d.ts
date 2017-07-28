declare module "la";
declare namespace LAConfig {
    export type Config = {
        endpointUrl: string,
        version: number,
        organizationId: string,
        deploymentId: string,
        buttonId: string,
        proxy: string,
    }
}
declare namespace LAData {
    // - Salesforce Data Type
    export type Button = {
        id: string,
        type: 'Standard' | 'Invite' | 'ToAgent',
        endpointUrl: string,
        prechatUrl: string,
        language: string,
        isAvailable: boolean,
        inviteImageUrl: string,
        inviteImageWidth: number,
        inviteImageHeight: number,
        inviteRenderer: 'Slide' | 'Fade' | 'Appear' | 'Custom',
        inviteStartPosition: string,
        inviteEndPosition: string,
        hasInviteAfterAccept: boolean,
        hasInviteAfterReject: boolean,
        inviteRejectTime: number,
        inviteRules: object,
    }

    export type CustomDetail = {
        label: string,
        value: string,
        transcriptFields: Array<string>,
        displayToAgent: boolean,
    }

    export type EntityFieldsMaps = {
        fieldName: string,
        label: string,
        doFind: boolean,
        isExactMatch: boolean,
        doCreate: boolean,
    }

    export type Entity = {
        entityName: string,
        showOnCreate: boolean,
        linkToEntityName: string,
        linkToEntityField: string,
        saveToTranscript: string,
        entityFieldsMaps: Array<EntityFieldsMaps>,
    }

    export type GeoLocation = {
        countryCode: string,
        countryName: string,
        region: string,
        city: string,
        organization: string,
        latitude: number,
        longitude: number,
    }

    export type Message = {
        type: string,
        message: object,
    }

    export type NounWrapper = {
        prefix: string,
        noun: string,
        data: string,
    }

    export type Result = {
        id: string,
        isAvailable: boolean,
    }

    export type TranscriptEntry = {
        type: 'Agent' | 'Chasitor' | 'OperatorTransferred',
        name: string,
        content: string,
        timestamp: number,
        sequence: number,
    }
}
declare namespace LARequest {
    export type Header = {
        version: string,
        affinity: string,
        sessionKey: string,
        sessionId: string,
        sequence: string,
    }
    export type Location = {
        type : string,
        description: string,
        required: boolean,
        version: number,
    }

    export type Breadcrumb = {
        location: Location,
    }

    export type ChasitorInit = {
        organizationId: string,
        deploymentId: string,
        buttonId: string,
        sessionId: string,
        userAgent: string,
        language: string,
        screenResolution: string,
        visitorName: string,
        prechatDetails: Array<LAData.CustomDetail>,
        prechatEntities: Array<LAData.Entity>,
        buttonOverrides: Array<string>,
        receiveQueueUpdates: boolean,
        isPost: boolean,
    }

    export type ChasitorResyncState = {
        organizationId: string,
    }

    export type ChasitorSneakPeek = {
        position: number,
        text: string,
    }

    export type ChatMessage = {
        text: string,
    }

    export type CustomEvent = {
        type: string,
        data: string,
    }

    export type MultiNoun = {
        nouns: Array<LAData.NounWrapper>,
    }
}
declare namespace LAResponse {
    export type Availability = {
        results: Array<LAData.Result>,
    }

    export type ChasitorSessionData = {
        queuePosition: number,
        geoLocation: LAData.GeoLocation,
        url: string,
        oref: string,
        postChatUrl: string,
        sneakPeekEnabled: boolean,
        chatMessages: Array<LAData.TranscriptEntry>,
    }

    export type ChasitorIdleTimeoutWarningEvent = {
        idleTimeoutWarningEvent: string,
    }

    export type ChatEstablished = {
        name: string,
        userId: string,
        sneakPeekEnabled: boolean,
        chasitorIdletimeout: any,
    }

    export type ChatMessage = {
        name: string,
        text: string,
    }

    export type ChatRequestFail = {
        reason: string,
        postChatUrl: string,
    }

    export type ChatRequestSuccess = {
        queuePosition: number,
        geoLocation: LAData.GeoLocation,
        url: string,
        oref: string,
        postChatUrl: string,
        customDetails: Array<LAData.CustomDetail>,
        visitorId: string,
    }

    export type ChatTransferred = {
        name: string,
        userId: string,
        sneakPeekEnabled: boolean,
        chasitorIdletimeout: any,

    }

    export type CustomEvent = {
        type: string,
        data: string,
    }

    export type Messages = {
        messages: Array<LAData.Message>,
        sequence: number,
    }

    export type NewVisitorBreadcrumb = {
        location: string,
    }

    export type QueueUpdate = {
        position: number,
    }

    export type ResyncSession = {
        isValid: boolean,
        key: string,
        affinityToken: string,
    }

    export type SessionId = {
        id: string,
        key: string,
        affinityToken: string,
        clientPollTimeout: number,
    }

    export type Settings = {
        pingrate: number,
        contentServerUrl: string,
        buttons: Array<LAData.Button>,
    }

    export type SwitchServer = {
        newUrl: string,
    }

    export type VisitorId = {
        sessionId: string,
    }
}