/// <reference types="ws" />
import { ClientConfiguration } from "./clientConfiguration";
import { RTMessage } from "./commands";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { OpenEvent, ErrorEvent, CloseEvent } from "./events";
import WebSocket from "isomorphic-ws";
export declare class WebSocketConnection {
    readonly tlsEnabled: boolean;
    webSocket: WebSocket | undefined;
    lastMessageReceived: string | undefined;
    connectionStats: ConnectionStats;
    connectionOpen: SimpleEventDispatcher<OpenEvent>;
    connectionClose: SimpleEventDispatcher<CloseEvent>;
    connectionError: SimpleEventDispatcher<ErrorEvent>;
    messageReceived: SimpleEventDispatcher<RTMessage>;
    constructor(tlsEnabled: boolean);
    dispose(disposing: boolean): void;
    initializeWebSocket(uri: string): void;
    createWebSocket(uri: string): WebSocket;
    close(): void;
    send: (packet: any) => void;
    getStats(): ConnectionStats;
    resetStats(): void;
    private webSocket_Opened;
    private webSocket_Closed;
    private webSocket_Error;
    private webSocket_MessageReceived;
}
export type ConnectionFactoryOptions = {
    readonly hostName: string;
    readonly caCert?: Uint8Array;
    readonly clientConfiguration: ClientConfiguration;
};
/**
 * Creates instance of WebSocket connection used in the client.
 */
export declare class WebSocketConnectionFactory {
    static create(options: ConnectionFactoryOptions): WebSocketConnection;
    private static validateOptions;
}
export declare class ConnectionStats {
    private messagesSent;
    private messagesReceived;
    getCopy(): ConnectionStats;
    reset(): void;
    recordMessageSent(): void;
    recordMessageReceived(): void;
    getMessagesSent(): number;
    getMessagesReceived(): number;
}
