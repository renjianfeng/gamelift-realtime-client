import { ServerOpCode, ConnectionType } from "./constants";
import { ClientConfiguration } from "./clientConfiguration";
import { RTMessage } from "./commands";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { toVarInt, isNodeEnvironment } from "./utils";
import { Buffer } from "buffer/";
import { OpenEvent, ErrorEvent, CloseEvent, MessageEvent } from "./events";
import WebSocket from "isomorphic-ws";
import { Packet } from './proto/Packet_pb';

export class WebSocketConnection {
  webSocket: WebSocket | undefined;

  lastMessageReceived: string | undefined;
  connectionStats = new ConnectionStats();

  connectionOpen = new SimpleEventDispatcher<OpenEvent>();
  connectionClose = new SimpleEventDispatcher<CloseEvent>();
  connectionError = new SimpleEventDispatcher<ErrorEvent>();
  messageReceived = new SimpleEventDispatcher<RTMessage>();

  constructor(public readonly tlsEnabled: boolean) { }

  dispose(disposing: boolean) {
    if (!disposing) return;
    if (this.webSocket) this.webSocket.close();
  }

  initializeWebSocket(uri: string) {
    console.log(`Initializing socket connection at: ${uri}`);
    this.webSocket = this.createWebSocket(uri);
    this.webSocket.onopen = this.webSocket_Opened;
    this.webSocket.onclose = this.webSocket_Closed;
    this.webSocket.onerror = this.webSocket_Error;
    this.webSocket.onmessage = this.webSocket_MessageReceived;
  }

  createWebSocket(uri: string): WebSocket {
    const socket = new WebSocket(uri);
    return socket;
  }

  close() {
    this.webSocket?.close();
  }

  // TODO: this should be typed
  send = (packet: any) => {
    if (!this.webSocket) return;
    var buffer = packet.serializeBinary();
    // add a header indicating the size of the data
    const sizeVarIntBytes = toVarInt(buffer.length);
    let packagedData = new Uint8Array(sizeVarIntBytes.length + buffer.length);
    packagedData.set(sizeVarIntBytes);
    packagedData.set(buffer, sizeVarIntBytes.length);
    this.webSocket.send(packagedData);
  };

  getStats(): ConnectionStats {
    return this.connectionStats;
  }

  resetStats() {
    this.connectionStats.reset();
  }

  private webSocket_Opened = (event: WebSocket.Event) => {
    this.connectionOpen.dispatch(event as OpenEvent);
  };

  private webSocket_Closed = (event: WebSocket.Event) => {
    this.connectionClose.dispatch(event as CloseEvent);
  };

  private webSocket_Error = (event: WebSocket.Event) => {
    console.error(event);
    this.connectionError.dispatch(event as ErrorEvent);
  };

  private webSocket_MessageReceived = (event: WebSocket.Event) => {
    this.connectionStats.recordMessageReceived();
    const eventData = (event as MessageEvent).data;

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
    } else {
      // in the browser, we need to use the FileReader to get our binary array
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const array = fileReader.result as ArrayBuffer;
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

export type ConnectionFactoryOptions = {
  readonly hostName: string;
  readonly caCert?: Uint8Array;
  readonly clientConfiguration: ClientConfiguration;
}

/**
 * Creates instance of WebSocket connection used in the client.
 */
export class WebSocketConnectionFactory {
  static create(options: ConnectionFactoryOptions): WebSocketConnection {
    this.validateOptions(options);

    const connectionType = options.clientConfiguration.connectionType;
    console.log(
      `Creating WebSocket connection with connectionType: ${connectionType}`
    );

    switch (connectionType) {
      case ConnectionType.RtOverWsUnsecured:
        return new WebSocketConnection(false);
      case ConnectionType.RtOverWssDtlsTls12:
        return new WebSocketConnection(true);
    }
  }

  private static validateOptions(options: ConnectionFactoryOptions) {
    if (!options.clientConfiguration)
      throw new Error(
        "Unable to create WebSocketConnection: clientConfiguration is undefined."
      );
  }
}

/*
 * Communication statistics for a single connection. 
 */
export class ConnectionStats {
  private messagesSent = 0;
  private messagesReceived = 0;

  getCopy(): ConnectionStats
  {
      let stats = new ConnectionStats();
      stats.messagesSent = this.messagesSent;
      stats.messagesReceived = this.messagesReceived;
      return stats;
  }

  reset()
  {
      this.messagesSent = 0;
      this.messagesReceived = 0;
  }

  recordMessageSent()
  {
      this.messagesSent++;
  }

  recordMessageReceived()
  {
      this.messagesReceived++;
  }

  getMessagesSent(): number
  {
      return this.messagesSent;
  }

  getMessagesReceived(): number
  {
      return this.messagesReceived;
  }
}
