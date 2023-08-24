import { ServerOpCode } from './constants';
import { Buffer } from 'buffer/';
import { Packet } from './proto/Packet_pb';
import { LoginCommand as LoginCommand_pb } from './proto/CoreCommands_pb';
export class RTMessage {
    constructor(opCode, sender, payload) {
        this.opCode = opCode;
        this.sender = sender;
        this.targetPlayer = 0;
        this.targetGroup = -1;
        this.payloadBinary = undefined;
        this.payloadBinary = payload;
    }
    getPayloadAsString() {
        let payloadString = "";
        if (this.payloadBinary) {
            const payloadBuffer = Buffer.from(this.payloadBinary);
            payloadString = payloadBuffer.toString();
        }
        return payloadString;
    }
    toInnerPacket(packet) {
        // TODO this seems wrong?
        return packet;
    }
    toPacket() {
        var _a;
        let packet = new Packet();
        packet.setOpcode(this.opCode);
        packet.setReliable(true);
        packet.setSender((_a = this.sender) !== null && _a !== void 0 ? _a : 0);
        packet.setTargetplayer(this.targetPlayer);
        packet.setTargetgroup(this.targetGroup);
        if (this.payloadBinary)
            packet.setPayload(this.payloadBinary);
        return this.toInnerPacket(packet);
    }
    static fromPacket(packet) {
        let message = new RTMessage(packet.getOpcode(), packet.getSender());
        const payload = packet.getPayload();
        if (payload)
            message.payloadBinary = Uint8Array.from(Buffer.from(payload));
        switch (message.opCode) {
            case ServerOpCode.LOGIN_RESULT:
                const loginResult = packet.getLoginresult();
                message = new LoginResult(packet.getTargetplayer(), loginResult.getSuccess(), loginResult.getConnecttoken(), loginResult.getReconnecttoken());
                break;
            default:
                const targetPlayer = packet.getTargetplayer();
                if (targetPlayer)
                    message.targetPlayer = targetPlayer;
                const targetGroup = packet.getTargetgroup();
                if (targetGroup)
                    message.targetGroup = targetGroup;
        }
        return message;
    }
}
export class LoginCommand extends RTMessage {
    constructor(playerSessionId, sender, payload) {
        super(ServerOpCode.LOGIN_REQUEST, sender, payload);
        this.playerSessionId = playerSessionId;
        // -1 is the server
        this.targetPlayer = -1;
    }
    toInnerPacket(packet) {
        const loginCommand = new LoginCommand_pb();
        loginCommand.setPlayersessionid(this.playerSessionId);
        loginCommand.setClientversion(2);
        packet.setLogin(loginCommand);
        return packet;
    }
}
export class LoginResult extends RTMessage {
    constructor(peerId, success, connectToken, reconnectToken, payload) {
        super(ServerOpCode.LOGIN_RESULT);
        this.success = success;
        this.connectToken = connectToken;
        this.reconnectToken = reconnectToken;
        this.targetPlayer = peerId;
        this.payloadBinary = payload;
    }
}
//# sourceMappingURL=commands.js.map