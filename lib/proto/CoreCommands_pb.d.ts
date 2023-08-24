export declare class LoginCommand {
    serializeBinary(): Uint8Array;
    getPlayersessionid(): string;
    setPlayersessionid(value: string): void;
    getClientversion(): number;
    setClientversion(value: number): void;
}

export declare class LoginResult {
    getSuccess(): boolean;
    setSuccess(value: boolean): void;
    getReconnecttoken(): string;
    setReconnecttoken(value: string): void;
    getPeerid(value: number): void;
    setPeerid(): number;
    getFastport(value: number): void;
    setFastport(): number;
    getCacert(): Uint8Array;
    setCacert(value: Uint8Array): void;
    getConnecttoken(): string;
    setConnecttoken(value: string): void;
}

export declare class PingCommand { }

export declare class PingResult { }

export declare class VerifyIdentityCommand {
    getPeerid(): number;
    setPeerid(value: number): void;
    getConnecttoken(): string;
    setConnecttoken(value: string): void;
}

export declare class VerifyIdentityResult {
    getSuccess(): boolean;
    setSuccess(value: boolean): void;
    getPeerid(): number;
    setPeerid(value: number): void;
}

export declare class UDPConnectMessage { }

export declare class PlayerConnectMessage {
    getPeerid(): number;
    setPeerid(value: number): void;
 }

export declare class PlayerDisconnectMessage {
    getPeerid(): number;
    setPeerid(value: number): void;
 }