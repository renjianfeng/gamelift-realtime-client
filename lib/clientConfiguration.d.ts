import { ConnectionType } from './constants';
import { WebSocketConnectionFactory } from './connection';
/**
* Defines connection properties to use when talking to GameLift Realtime
* Servers.
*/
export declare class ClientConfiguration {
    connectionType: ConnectionType;
    webSocketConnectionFactory: WebSocketConnectionFactory;
    static createDefault(): ClientConfiguration;
}
