import { Packet } from './proto/Packet_pb';
export declare class RTMessage {
    readonly opCode: number;
    sender?: number | undefined;
    targetPlayer: number;
    targetGroup: number;
    payloadBinary: Uint8Array | undefined;
    constructor(opCode: number, sender?: number | undefined, payload?: Uint8Array);
    getPayloadAsString(): string;
    toInnerPacket(packet: Packet): Packet;
    toPacket(): Packet;
    static fromPacket(packet: Packet): RTMessage;
}
export declare class LoginCommand extends RTMessage {
    playerSessionId: string;
    constructor(playerSessionId: string, sender: number, payload?: Uint8Array);
    toInnerPacket(packet: Packet): any;
}
export declare class LoginResult extends RTMessage {
    readonly success: boolean;
    readonly connectToken: string;
    readonly reconnectToken: string;
    constructor(peerId: number, success: boolean, connectToken: string, reconnectToken: string, payload?: Uint8Array);
}
