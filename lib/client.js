import { ServerOpCode, ConnectionStatus } from "./constants";
import { ClientConfiguration } from "./clientConfiguration";
import { WebSocketConnectionFactory } from "./connection";
import { LoginCommand } from "./commands";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { RTMessage } from "./commands";
import { Buffer } from "buffer/";
export class GameLiftRealtimeClient {
    /*
     * False until client connects to GameLift Realtime. True while connected to any server.
     */
    get connected() {
        return this.connectionStatus === ConnectionStatus.Connected;
    }
    /*
     * A refined version of connected which is true only if the connection to
     * the server is ready to accept operations like join, leave, etc.
     */
    get connectedAndReady() {
        var _a;
        return this.connected && ((_a = this.session) === null || _a === void 0 ? void 0 : _a.loggedIn);
    }
    constructor(connectionToken) {
        this.connectionStatus = ConnectionStatus.Disconnected;
        this.onOpen = new SimpleEventDispatcher();
        this.onClose = new SimpleEventDispatcher();
        this.onError = new SimpleEventDispatcher();
        this.onLogin = new SimpleEventDispatcher();
        this.onDataReceived = new SimpleEventDispatcher();
        this.onConnectionOpen = (event) => {
            this.connectionStatus = ConnectionStatus.Connected;
            const loginCommand = new LoginCommand(this.session.token.playerSessionId, this.session.token.connectedPeerId, this.session.token.payload);
            console.log({
                playerSessionId: this.session.token.playerSessionId,
                connectedPeerId: this.session.token.connectedPeerId,
                payload: this.session.token.payload
            });
            this.send(loginCommand);
            this.onOpen.dispatch(event);
        };
        this.onConnectionClose = (event) => {
            this.session.loggedIn = false;
            this.connectionStatus = ConnectionStatus.Disconnected;
            this.onClose.dispatch(event);
        };
        this.onConnectionError = (event) => {
            this.onError.dispatch(event);
        };
        this.onMessageReceived = (message) => {
            switch (message.opCode) {
                case ServerOpCode.LOGIN_RESULT:
                    this.handleLoginResponse(message);
                default:
                    this.onDataReceived.dispatch(message);
            }
        };
        this.handleLoginResponse = (result) => {
            this.session.connectedPeerId = result.targetPlayer;
            this.session.loggedIn = result.success;
            this.onLogin.dispatch(this.session);
        };
        this.send = (message) => {
            if (!this.connected)
                return;
            const payloadSize = message.payloadBinary ? message.payloadBinary.length : 0;
            if (payloadSize > GameLiftRealtimeClient.maxWebSocketMessageBytes) {
                console.error(`The payload you're attempting to send on message with opCode '${message.opCode}' is larger than the maximum allowed bytes (${GameLiftRealtimeClient.maxWebSocketMessageBytes}).`);
                return;
            }
            const packet = message.toPacket();
            // packet.setSender(this.session.connectedPeerId);
            packet.setReliable(true);
            this.webSocketConnection.send(packet);
        };
        this.session = new ClientSession(connectionToken);
        this.serverEndpoint = connectionToken.serverEndpoint;
    }
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
    connect() {
        var _a;
        const connectionFactoryOptions = {
            hostName: (_a = this.serverEndpoint) !== null && _a !== void 0 ? _a : "",
            clientConfiguration: ClientConfiguration.createDefault(),
        };
        this.webSocketConnection =
            WebSocketConnectionFactory.create(connectionFactoryOptions);
        this.webSocketConnection.connectionOpen.subscribe(this.onConnectionOpen);
        this.webSocketConnection.connectionClose.subscribe(this.onConnectionClose);
        this.webSocketConnection.connectionError.subscribe(this.onConnectionError);
        this.webSocketConnection.messageReceived.subscribe(this.onMessageReceived);
        if (this.serverEndpoint)
            this.webSocketConnection.initializeWebSocket(this.serverEndpoint);
        else
            throw Error("Called connect() on GameLiftRealtimClient with undefined serverEndpoint");
    }
    /**
     * When connected to a game session, disconnects the game client from the
     * game session.
     */
    disconnect() {
        var _a;
        this.connectionStatus = ConnectionStatus.Disconnected;
        (_a = this.webSocketConnection) === null || _a === void 0 ? void 0 : _a.close();
    }
    /**
     * Adds the player to the membership of a specified group. Groups can
     * contain any of the players that are connected to the game. Once joined,
     * the player receives all future messages sent to the group and can send
     * messages to the entire group.
     */
    joinGroup(targetGroup) {
        throw new Error("Group methods not yet implemented");
    }
    /**
     * Removes the player from the membership of a specified group. Once no
     * longer in the group, the player does not receive messages sent to the group
     * and cannot send messages to the entire group.
     */
    leaveGroup(targetGroup) {
        throw new Error("Group methods not yet implemented");
    }
    /*
     * Requests that a list of players in the specified group be sent to the game
     * client. Any player can request this information, regardless of whether they
     * are a member of the group or not. In response to this request, the membership
     * list is sent to the client via an onGroupMembershipUpdated() callback.
     */
    requestGroupMembership(targetGroup) {
        throw new Error("Group methods not yet implemented");
    }
    /*
     * Get TCP statistics for the client.
     */
    getWebSocketConnectionStats() {
        var _a;
        return (_a = this.webSocketConnection) === null || _a === void 0 ? void 0 : _a.getStats();
    }
    /*
     *  Reset the client's statistics set.
     */
    resetStats() {
        var _a;
        (_a = this.webSocketConnection) === null || _a === void 0 ? void 0 : _a.resetStats();
    }
    /**
     * Create a new Realtime Message using the passed OpCode and the client's connected identity.
     *
     * @param opCode - The OpCode to set for the message.
     * @param payload - Optional string(ified) payload to pack into the message.
     *
     * @returns A Realtime Message object.
     */
    newMessage(opCode, payload) {
        let payloadBinary = undefined;
        if (payload) {
            const payloadBuffer = Buffer.from(payload.toString(), "utf-8");
            payloadBinary = Uint8Array.from(payloadBuffer);
        }
        return new RTMessage(opCode, this.session.connectedPeerId, payloadBinary);
    }
    /**
     * Send a general Realtime Message via the server.
     */
    sendMessage(message) {
        this.send(message);
    }
}
/**
 * Version number of GameLift Realtime Client SDK for TypeScript.
 */
GameLiftRealtimeClient.clientVersion = "0.0.1";
/**
 * Maximum message size for reliable messages.
 *
 * @remarks
 * This limit applies to the payload field of messages.
 */
GameLiftRealtimeClient.maxWebSocketMessageBytes = 4096;
export var SessionState;
(function (SessionState) {
    SessionState[SessionState["Ready"] = 0] = "Ready";
    SessionState[SessionState["Open"] = 1] = "Open";
    SessionState[SessionState["Connected"] = 2] = "Connected";
    SessionState[SessionState["Disconnected"] = 3] = "Disconnected";
})(SessionState || (SessionState = {}));
export class ClientSession {
    constructor(token) {
        this.token = token;
        this.groupMembership = new Set();
        this.state = SessionState.Ready;
        this.loggedIn = false;
    }
    joinGroup(groupId) {
        this.groupMembership.add(groupId);
    }
    leaveGroup(groupId) {
        this.groupMembership.delete(groupId);
    }
    updateGroupMembership(groupId, players) {
        if (!this.connectedPeerId)
            return;
        if (players.includes(this.connectedPeerId))
            this.joinGroup(groupId);
        else
            this.leaveGroup(groupId);
    }
    isInGroup(groupId) {
        return this.groupMembership.has(groupId);
    }
}
//# sourceMappingURL=client.js.map