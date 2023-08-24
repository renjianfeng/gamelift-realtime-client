import { ConnectionType } from "./constants";
import { RTMessage } from "./commands";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { toVarInt, isNodeEnvironment } from "./utils";
import { Buffer } from "buffer/";
import WebSocket from "isomorphic-ws";
import { Packet } from './proto/Packet_pb';
export class WebSocketConnection {
    constructor(tlsEnabled) {
        this.tlsEnabled = tlsEnabled;
        this.connectionStats = new ConnectionStats();
        this.connectionOpen = new SimpleEventDispatcher();
        this.connectionClose = new SimpleEventDispatcher();
        this.connectionError = new SimpleEventDispatcher();
        this.messageReceived = new SimpleEventDispatcher();
        // TODO: this should be typed
        this.send = (packet) => {
            if (!this.webSocket)
                return;
            var buffer = packet.serializeBinary();
            // add a header indicating the size of the data
            const sizeVarIntBytes = toVarInt(buffer.length);
            let packagedData = new Uint8Array(sizeVarIntBytes.length + buffer.length);
            packagedData.set(sizeVarIntBytes);
            packagedData.set(buffer, sizeVarIntBytes.length);
            this.webSocket.send(packagedData);
        };
        this.webSocket_Opened = (event) => {
            this.connectionOpen.dispatch(event);
        };
        this.webSocket_Closed = (event) => {
            this.connectionClose.dispatch(event);
        };
        this.webSocket_Error = (event) => {
            console.error(event);
            this.connectionError.dispatch(event);
        };
        this.webSocket_MessageReceived = (event) => {
            this.connectionStats.recordMessageReceived();
            const eventData = event.data;
            if (isNodeEnvironment()) {
                // in node, we have to use the Buffer object to get
                // an array from a blob
                const nodeBuffer = new Buffer(eventData, "binary");
                const buffer = new Uint8Array(nodeBuffer.buffer);
                // get the message size
                let sizeFieldLen = 0;
                while (sizeFieldLen < buffer.length && buffer[sizeFieldLen] >= 128) {
                    sizeFieldLen++;
                }
                // get the message
                const data = buffer.slice(sizeFieldLen + 1);
                const packet = Packet.deserializeBinary(data);
                // send the packet to the callback
                this.messageReceived.dispatch(RTMessage.fromPacket(packet));
            }
            else {
                // in the browser, we need to use the FileReader to get our binary array
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    const array = fileReader.result;
                    // convert our data to a Uint8Array and slice out the header and body
                    const buffer = new Uint8Array(array);
                    // get the message size
                    let sizeFieldLen = 0;
                    while (sizeFieldLen < buffer.length && buffer[sizeFieldLen] >= 128) {
                        sizeFieldLen++;
                    }
                    // get the message
                    const data = buffer.slice(sizeFieldLen + 1);
                    const packet = Packet.deserializeBinary(data);
                    // send the packet to the callback
                    this.messageReceived.dispatch(RTMessage.fromPacket(packet));
                };
                fileReader.readAsArrayBuffer(eventData);
            }
        };
    }
    dispose(disposing) {
        if (!disposing)
            return;
        if (this.webSocket)
            this.webSocket.close();
    }
    initializeWebSocket(uri) {
        console.log(`Initializing socket connection at: ${uri}`);
        this.webSocket = this.createWebSocket(uri);
        this.webSocket.onopen = this.webSocket_Opened;
        this.webSocket.onclose = this.webSocket_Closed;
        this.webSocket.onerror = this.webSocket_Error;
        this.webSocket.onmessage = this.webSocket_MessageReceived;
    }
    createWebSocket(uri) {
        const socket = new WebSocket(uri);
        return socket;
    }
    close() {
        var _a;
        (_a = this.webSocket) === null || _a === void 0 ? void 0 : _a.close();
    }
    getStats() {
        return this.connectionStats;
    }
    resetStats() {
        this.connectionStats.reset();
    }
}
/**
 * Creates instance of WebSocket connection used in the client.
 */
export class WebSocketConnectionFactory {
    static create(options) {
        this.validateOptions(options);
        const connectionType = options.clientConfiguration.connectionType;
        console.log(`Creating WebSocket connection with connectionType: ${connectionType}`);
        switch (connectionType) {
            case ConnectionType.RtOverWsUnsecured:
                return new WebSocketConnection(false);
            case ConnectionType.RtOverWssDtlsTls12:
                return new WebSocketConnection(true);
        }
    }
    static validateOptions(options) {
        if (!options.clientConfiguration)
            throw new Error("Unable to create WebSocketConnection: clientConfiguration is undefined.");
    }
}
/*
 * Communication statistics for a single connection.
 */
export class ConnectionStats {
    constructor() {
        this.messagesSent = 0;
        this.messagesReceived = 0;
    }
    getCopy() {
        let stats = new ConnectionStats();
        stats.messagesSent = this.messagesSent;
        stats.messagesReceived = this.messagesReceived;
        return stats;
    }
    reset() {
        this.messagesSent = 0;
        this.messagesReceived = 0;
    }
    recordMessageSent() {
        this.messagesSent++;
    }
    recordMessageReceived() {
        this.messagesReceived++;
    }
    getMessagesSent() {
        return this.messagesSent;
    }
    getMessagesReceived() {
        return this.messagesReceived;
    }
}
//# sourceMappingURL=connection.js.map