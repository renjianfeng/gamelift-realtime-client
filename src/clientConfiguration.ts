import { ConnectionType } from './constants';
import { WebSocketConnectionFactory } from './connection';

/**
* Defines connection properties to use when talking to GameLift Realtime
* Servers.
*/
export class ClientConfiguration
{
    /*
     *  Type of connection suite to use to connect to GameLift Realtime Servers.
     */
    connectionType = ConnectionType.RtOverWsUnsecured;

    /*
     * Provides implementation of reliable connections based on the ConnectionType.
     */
    webSocketConnectionFactory = new WebSocketConnectionFactory();

    /*
     * Create a default ClientConfiguration, which contains the following configuration for the game client:
     * 1. Connects to Gamelift Realtime Server
     * 2. Establishes reliable connection to server with a WebSocket
     * 3. Connection is Unsecured
     *
     * @returns The default game client configuration.
     */
    static createDefault(): ClientConfiguration 
    {
        return new ClientConfiguration();
    }
}