import { ServerOpCode, ConnectionStatus } from "./constants";
import { ClientConfiguration } from "./clientConfiguration";
import { WebSocketConnection, WebSocketConnectionFactory, ConnectionFactoryOptions, ConnectionStats } from "./connection";
import { LoginCommand, LoginResult } from "./commands";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { RTMessage } from "./commands";
import { Buffer } from "buffer/";

import {
  Event,
  OpenEvent,
  ErrorEvent,
  CloseEvent,
} from "./events";

export class GameLiftRealtimeClient {
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
  connectionStatus: ConnectionStatus = ConnectionStatus.Disconnected;

  /*
   * False until client connects to GameLift Realtime. True while connected to any server.
   */
  get connected(): boolean {
    return this.connectionStatus === ConnectionStatus.Connected;
  }

  /*
   * A refined version of connected which is true only if the connection to
   * the server is ready to accept operations like join, leave, etc.
   */
  get connectedAndReady(): boolean {
    return this.connected && this.session?.loggedIn;
  }

  serverEndpoint: string | undefined;

  onOpen = new SimpleEventDispatcher<OpenEvent>();
  onClose = new SimpleEventDispatcher<CloseEvent>();
  onError = new SimpleEventDispatcher<ErrorEvent>();
  onLogin = new SimpleEventDispatcher<ClientSession>();
  onDataReceived = new SimpleEventDispatcher<RTMessage>();

  constructor(connectionToken: ConnectionToken) {
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
    const connectionFactoryOptions = {
      hostName: this.serverEndpoint ?? "",
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
    else throw Error("Called connect() on GameLiftRealtimClient with undefined serverEndpoint");
  }

  /**
   * When connected to a game session, disconnects the game client from the
   * game session.
   */
  disconnect() {
    this.connectionStatus = ConnectionStatus.Disconnected;
    this.webSocketConnection?.close();
  }

  /**
   * Adds the player to the membership of a specified group. Groups can
   * contain any of the players that are connected to the game. Once joined,
   * the player receives all future messages sent to the group and can send
   * messages to the entire group.
   */
  joinGroup(targetGroup: number): never {
    throw new Error("Group methods not yet implemented");
  }

  /**
   * Removes the player from the membership of a specified group. Once no
   * longer in the group, the player does not receive messages sent to the group
   * and cannot send messages to the entire group.
   */
  leaveGroup(targetGroup: number): never {
    throw new Error("Group methods not yet implemented");
   }

  /*
   * Requests that a list of players in the specified group be sent to the game
   * client. Any player can request this information, regardless of whether they
   * are a member of the group or not. In response to this request, the membership
   * list is sent to the client via an onGroupMembershipUpdated() callback.
   */
  requestGroupMembership(targetGroup: number): never {
    throw new Error("Group methods not yet implemented");
   }

  /*
   * Get TCP statistics for the client.
   */
  getWebSocketConnectionStats(): ConnectionStats | undefined {
    return this.webSocketConnection?.getStats();
  }

  /*
   *  Reset the client's statistics set.
   */
  resetStats() {
    this.webSocketConnection?.resetStats();
  }

  private onConnectionOpen = (event: Event) => {
    this.connectionStatus = ConnectionStatus.Connected;
    const loginCommand = new LoginCommand(
      this.session.token!.playerSessionId!,
      this.session.token!.connectedPeerId!,
      this.session.token!.payload
    );
      console.log({
	  playerSessionId: this.session.token!.playerSessionId!,
	  connectedPeerId: this.session.token!.connectedPeerId!,
	  payload: this.session.token!.payload
      })
    this.send(loginCommand);
    this.onOpen.dispatch(event);
  };

  private onConnectionClose = (event: CloseEvent) => {
    this.session.loggedIn = false;
    this.connectionStatus = ConnectionStatus.Disconnected;
    this.onClose.dispatch(event);
  };

  private onConnectionError = (event: ErrorEvent) => {
    this.onError.dispatch(event);
  };

  private onMessageReceived = (message: RTMessage) => {
    switch (message.opCode) {
      case ServerOpCode.LOGIN_RESULT:
        this.handleLoginResponse(message as LoginResult);
      default:
        this.onDataReceived.dispatch(message);
    }
  };

  private handleLoginResponse = (result: LoginResult) => {
    this.session.connectedPeerId = result.targetPlayer;
    this.session.loggedIn = result.success;
    this.onLogin.dispatch(this.session);
  };

  private send = (message: RTMessage) => {
    if (!this.connected) return;
    const payloadSize = message.payloadBinary ? message.payloadBinary.length : 0;
    if (payloadSize > GameLiftRealtimeClient.maxWebSocketMessageBytes) {
      console.error(
        `The payload you're attempting to send on message with opCode '${message.opCode}' is larger than the maximum allowed bytes (${GameLiftRealtimeClient.maxWebSocketMessageBytes}).`
      );
      return;
    }
    const packet = message.toPacket();
    // packet.setSender(this.session.connectedPeerId);
    packet.setReliable(true);
    this.webSocketConnection!.send(packet);
  };

  /**
   * Create a new Realtime Message using the passed OpCode and the client's connected identity.
   *
   * @param opCode - The OpCode to set for the message.
   * @param payload - Optional string(ified) payload to pack into the message.
   *
   * @returns A Realtime Message object.
   */
  newMessage(opCode: number, payload?: string) {
    let payloadBinary: Uint8Array | undefined = undefined;
    if (payload) {
      const payloadBuffer = Buffer.from(payload.toString(), "utf-8");
      payloadBinary = Uint8Array.from(payloadBuffer);
    }
    return new RTMessage(opCode, this.session.connectedPeerId, payloadBinary);
  }

  /**
   * Send a general Realtime Message via the server.
   */
  sendMessage(message: RTMessage) {
    this.send(message);
  }
}

export enum SessionState {
  Ready,
  Open,
  Connected,
  Disconnected,
}

export class ClientSession {
  loggedIn: boolean;
  state: SessionState;

  /**
   * Represents the GameLift Realtime peer Id for the client. Set on
   * connection.
   */
  connectedPeerId: number | undefined;
  private groupMembership: Set<number>;

  public constructor(public readonly token?: ConnectionToken) {
    this.groupMembership = new Set<number>();
    this.state = SessionState.Ready;
    this.loggedIn = false;
  }

  joinGroup(groupId: number) {
    this.groupMembership.add(groupId);
  }

  leaveGroup(groupId: number) {
    this.groupMembership.delete(groupId);
  }

  updateGroupMembership(groupId: number, players: number[]) {
    if (!this.connectedPeerId) return;
    if (players.includes(this.connectedPeerId)) this.joinGroup(groupId);
    else this.leaveGroup(groupId);
  }

  isInGroup(groupId: number): boolean {
    return this.groupMembership.has(groupId);
  }
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
