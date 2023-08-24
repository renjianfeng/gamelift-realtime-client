export enum ServerOpCode {
    'LOGIN_REQUEST' = 0,
    'LOGIN_RESULT' = -1,
    'PING_RESULT' = -3,
    'UDP_CONNECT' = -5,
    'UDP_CONNECT_SERVER_ACK' = -6,
    'UDP_CONNECT_CLIENT_ACK' = -7,
    'PLAYER_READY' = -8,
    'JOIN_GROUP' = -10,
    'LEAVE_GROUP' = -11,
    'REQUEST_GROUP_MEMBERSHIP' = -12,
    'GROUP_MEMBERSHIP_UPDATE' = -13,
    'VERIFY_IDENTITY' = -14,
    'VERIFY_IDENTITY_RESULT' = -15,
    'PLAYER_CONNECT' = 113,
    'PLAYER_DISCONNECT' = 114,
} 

export enum ConnectionStatus {
    Disconnected,
    Connecting,
    Connected
}

/**
 * Defines the types of connection suites supported by the SDK.
 */
export enum ConnectionType {
    RtOverWsUnsecured = 0,
    RtOverWssDtlsTls12 = 1
}
