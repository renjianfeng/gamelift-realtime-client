import {
    LoginCommand, LoginResult,
    PingCommand, PingResult, VerifyIdentityCommand,
    VerifyIdentityResult, UDPConnectMessage,
    PlayerConnectMessage, PlayerDisconnectMessage
} from './CoreCommands_pb';

import {
    JoinGroup, LeaveGroup,
    RequestGroupMembership, GroupMembershipUpdate
} from './GroupMessages_pb';

export declare class Packet {
    static deserializeBinary(bytes: Uint8Array): Packet;
    serializeBinary(): Uint8Array;
    getOpcode(): number;
    setOpcode(value: number): void;
    getSequencenumber(): number;
    setSequencenumber(value: number): void;
    getTargetplayer(): number;
    setTargetplayer(value: number): void;
    getTargetgroup(): number;
    setTargetgroup(value: number): void;
    getSender(): number;
    setSender(value: number): void;
    getReliable(): boolean;
    setReliable(value: boolean): void;
    getClientversion(): number;
    setClientversion(value: number): void;
    getPayload(): Uint8Array;
    setPayload(value: Uint8Array): void;
    getLogin(): LoginCommand;
    setLogin(value: LoginCommand): void;
    getLoginresult(): LoginResult;
    setLoginresult(value: LoginResult): void;
    getPing(): PingCommand;
    setPing(value: PingCommand): void;
    getPingresult(): PingResult;
    setPingresult(value: PingResult): void;
    getUdpconnect(): UDPConnectMessage;
    setUdpconnect(value: UDPConnectMessage): void;
    getPlayerconnect(): PlayerConnectMessage;
    setPlayerconnect(value: PlayerConnectMessage): void;
    getPlayerdisconnect(): PlayerDisconnectMessage;
    setPlayerdisconnect(value: PlayerDisconnectMessage): void;
    getJoingroup(): JoinGroup;
    setJoingroup(value: JoinGroup): void;
    getLeavegroup(): LeaveGroup;
    setLeavegroup(value: LeaveGroup): void;
    getRequestgroupmembership(): RequestGroupMembership;
    setRequestgroupmembership(value: RequestGroupMembership): void;
}
