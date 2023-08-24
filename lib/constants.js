export var ServerOpCode;
(function (ServerOpCode) {
    ServerOpCode[ServerOpCode["LOGIN_REQUEST"] = 0] = "LOGIN_REQUEST";
    ServerOpCode[ServerOpCode["LOGIN_RESULT"] = -1] = "LOGIN_RESULT";
    ServerOpCode[ServerOpCode["PING_RESULT"] = -3] = "PING_RESULT";
    ServerOpCode[ServerOpCode["UDP_CONNECT"] = -5] = "UDP_CONNECT";
    ServerOpCode[ServerOpCode["UDP_CONNECT_SERVER_ACK"] = -6] = "UDP_CONNECT_SERVER_ACK";
    ServerOpCode[ServerOpCode["UDP_CONNECT_CLIENT_ACK"] = -7] = "UDP_CONNECT_CLIENT_ACK";
    ServerOpCode[ServerOpCode["PLAYER_READY"] = -8] = "PLAYER_READY";
    ServerOpCode[ServerOpCode["JOIN_GROUP"] = -10] = "JOIN_GROUP";
    ServerOpCode[ServerOpCode["LEAVE_GROUP"] = -11] = "LEAVE_GROUP";
    ServerOpCode[ServerOpCode["REQUEST_GROUP_MEMBERSHIP"] = -12] = "REQUEST_GROUP_MEMBERSHIP";
    ServerOpCode[ServerOpCode["GROUP_MEMBERSHIP_UPDATE"] = -13] = "GROUP_MEMBERSHIP_UPDATE";
    ServerOpCode[ServerOpCode["VERIFY_IDENTITY"] = -14] = "VERIFY_IDENTITY";
    ServerOpCode[ServerOpCode["VERIFY_IDENTITY_RESULT"] = -15] = "VERIFY_IDENTITY_RESULT";
    ServerOpCode[ServerOpCode["PLAYER_CONNECT"] = 113] = "PLAYER_CONNECT";
    ServerOpCode[ServerOpCode["PLAYER_DISCONNECT"] = 114] = "PLAYER_DISCONNECT";
})(ServerOpCode || (ServerOpCode = {}));
export var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Disconnected"] = 0] = "Disconnected";
    ConnectionStatus[ConnectionStatus["Connecting"] = 1] = "Connecting";
    ConnectionStatus[ConnectionStatus["Connected"] = 2] = "Connected";
})(ConnectionStatus || (ConnectionStatus = {}));
/**
 * Defines the types of connection suites supported by the SDK.
 */
export var ConnectionType;
(function (ConnectionType) {
    ConnectionType[ConnectionType["RtOverWsUnsecured"] = 0] = "RtOverWsUnsecured";
    ConnectionType[ConnectionType["RtOverWssDtlsTls12"] = 1] = "RtOverWssDtlsTls12";
})(ConnectionType || (ConnectionType = {}));
//# sourceMappingURL=constants.js.map