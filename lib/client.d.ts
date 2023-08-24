import { ConnectionStatus } from "./constants";
import { WebSocketConnection, ConnectionStats } from "./connection";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { RTMessage } from "./commands";
import { OpenEvent, ErrorEvent, CloseEvent } from "./events";
export declare class GameLiftRealtimeClient {
    /**
     * Version number of GameLift Realtime Client SDK for TypeScript.
     */
    static readonly clientVersion = "0.0.1";
    /**
     * Maximum message size for reliable messages.
     *
     * @remarks
     * This limit applies to the payload field of messages.
     */
    static readonly maxWebSocketMessageBytes = 4096;
    /** Developer client version. Sent during connect.</summary>
     *
     * @remarks This is only sent when you connect, can be used by sever scripts
     * to separate incompatible clients.
     */
    static gameVersion: string;
    /**
     * Holds information about the connected session for the client.
     */
    session: ClientSession;
    webSocketConnection: WebSocketConnection | undefined;
    connectionStatus: ConnectionStatus;
    get connected(): boolean;
    get connectedAndReady(): boolean;
    serverEndpoint: string | undefined;
    onOpen: SimpleEventDispatcher<OpenEvent>;
    onClose: SimpleEventDispatcher<CloseEvent>;
    onError: SimpleEventDispatcher<ErrorEvent>;
    onLogin: SimpleEventDispatcher<ClientSession>;
    onDataReceived: SimpleEventDispatcher<RTMessage>;
    constructor(connectionToken: ConnectionToken);
    /**
     * Connect to a Realtime server
     *
     * @param endpoint - The endpoint to connect to, for example the IpAddress
     * returned for a game session.
     * @param remoteTcpPort - The Realtime server's TCP port, for example the
     * port of the game session.
     * @param token - The connection token to include
     *
     * @returns Connection status of the client.
     */
    connect(): void;
    /**
     * When connected to a game session, disconnects the game client from the
     * game session.
     */
    disconnect(): void;
    /**
     * Adds the player to the membership of a specified group. Groups can
     * contain any of the players that are connected to the game. Once joined,
     * the player receives all future messages sent to the group and can send
     * messages to the entire group.
     */
    joinGroup(targetGroup: number): never;
    /**
     * Removes the player from the membership of a specified group. Once no
     * longer in the group, the player does not receive messages sent to the group
     * and cannot send messages to the entire group.
     */
    leaveGroup(targetGroup: number): never;
    requestGroupMembership(targetGroup: number): never;
    getWebSocketConnectionStats(): ConnectionStats | undefined;
    resetStats(): void;
    private onConnectionOpen;
    private onConnectionClose;
    private onConnectionError;
    private onMessageReceived;
    private handleLoginResponse;
    private send;
    /**
     * Create a new Realtime Message using the passed OpCode and the client's connected identity.
     *
     * @param opCode - The OpCode to set for the message.
     * @param payload - Optional string(ified) payload to pack into the message.
     *
     * @returns A Realtime Message object.
     */
    newMessage(opCode: number, payload?: string): RTMessage;
    /**
     * Send a general Realtime Message via the server.
     */
    sendMessage(message: RTMessage): void;
}
export declare enum SessionState {
    Ready = 0,
    Open = 1,
    Connected = 2,
    Disconnected = 3
}
export declare class ClientSession {
    readonly token?: ConnectionToken | undefined;
    loggedIn: boolean;
    state: SessionState;
    /**
     * Represents the GameLift Realtime peer Id for the client. Set on
     * connection.
     */
    connectedPeerId: number | undefined;
    private groupMembership;
    constructor(token?: ConnectionToken | undefined);
    joinGroup(groupId: number): void;
    leaveGroup(groupId: number): void;
    updateGroupMembership(groupId: number, players: number[]): void;
    isInGroup(groupId: number): boolean;
}
/**
 * Propeties to pass during login/connect on a GameLift Realtime Server
 */
export type ConnectionToken = {
    readonly serverEndpoint: string;
    readonly playerSessionId: string;
    readonly connectedPeerId: number;
    readonly payload?: Uint8Array;
};
