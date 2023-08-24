import { ServerOpCode } from './constants';
import { Buffer } from 'buffer/';
import { Packet } from './proto/Packet_pb';
import { LoginCommand as LoginCommand_pb } from './proto/CoreCommands_pb';

export class RTMessage {
    targetPlayer: number = 0;
    targetGroup: number = -1;
    payloadBinary: Uint8Array | undefined = undefined;

    constructor(public readonly opCode: number, public sender?: number, payload?: Uint8Array) {
        this.payloadBinary = payload;
    }

    getPayloadAsString(): string {
        let payloadString = "";
        if (this.payloadBinary) {
            const payloadBuffer = Buffer.from(this.payloadBinary);
            payloadString = payloadBuffer.toString();
        }
        return payloadString;
    }

    toInnerPacket(packet: Packet): Packet {
        // TODO this seems wrong?
       return packet; 
    }

    toPacket(): Packet {
        let packet = new Packet(); 
        packet.setOpcode(this.opCode);
        packet.setReliable(true);
        packet.setSender(this.sender ?? 0);
        packet.setTargetplayer(this.targetPlayer);
        packet.setTargetgroup(this.targetGroup);
        if (this.payloadBinary) packet.setPayload(this.payloadBinary);
        return this.toInnerPacket(packet);
    }

    static fromPacket(packet: Packet): RTMessage {
        let message = new RTMessage(packet.getOpcode(), packet.getSender());

        const payload = packet.getPayload();
        if (payload) message.payloadBinary = Uint8Array.from(Buffer.from(payload));

        switch (message.opCode) {
            case ServerOpCode.LOGIN_RESULT:
                const loginResult = packet.getLoginresult();
                message = new LoginResult(packet.getTargetplayer(), loginResult.getSuccess(),
                    loginResult.getConnecttoken(), loginResult.getReconnecttoken());
                break;
            default:
                const targetPlayer = packet.getTargetplayer();
                if (targetPlayer) message.targetPlayer = targetPlayer;
                const targetGroup = packet.getTargetgroup();
                if (targetGroup) message.targetGroup = targetGroup;
        }

        return message;
    }
}

export class LoginCommand extends RTMessage {
    constructor(public playerSessionId: string, sender: number, payload?: Uint8Array) {
        super(ServerOpCode.LOGIN_REQUEST, sender, payload);
        // -1 is the server
        this.targetPlayer = -1;
    }

    toInnerPacket(packet: Packet): any {
        const loginCommand = new LoginCommand_pb();
        loginCommand.setPlayersessionid(this.playerSessionId);
        loginCommand.setClientversion(2);
        packet.setLogin(loginCommand);
        return packet;
    }
}

export class LoginResult extends RTMessage {
   constructor(peerId: number, public readonly success: boolean, public readonly connectToken: string,
              public readonly reconnectToken: string, payload?: Uint8Array) {
       super(ServerOpCode.LOGIN_RESULT);
       this.targetPlayer = peerId;
       this.payloadBinary = payload;
   }
}
