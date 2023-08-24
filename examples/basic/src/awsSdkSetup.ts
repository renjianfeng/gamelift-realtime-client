import { GameLiftClient, GameSession, PlayerSession, SearchGameSessionsCommand,
	 CreateGameSessionCommand, CreatePlayerSessionCommand } from '@aws-sdk/client-gamelift';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

const GAMELIFT_FLEET = 'fleet-493d49d4-c77a-4808-9bac-bc610f4eb092';
const GAMELIFT_FLEET_REGION = 'us-east-2';
const COGNITO_IDENTITY_POOL= 'ap-northeast-2:2fb6816c-66aa-4e47-bdf0-6186a0cef53e';
const COGNITO_IDENTITY_REGION = 'ap-northeast-2';
const MAXIMUM_PLAYERS = 10;
export const GAMELIFT_USE_SSL = false;

let gameLiftClient: GameLiftClient;
const initGameLiftClient = () => {
    gameLiftClient = new GameLiftClient({
	region: GAMELIFT_FLEET_REGION,
	credentials: fromCognitoIdentityPool({
	    client: new CognitoIdentityClient({ region: COGNITO_IDENTITY_REGION }),
	    identityPoolId: COGNITO_IDENTITY_POOL
	})
    });
}

export async function createGameWithPlayer(gameSessionName: string): PlayerSession {
    if (!gameLiftClient) initGameLiftClient();
    const createGameSessionCommand = new CreateGameSessionCommand({
	FleetId: GAMELIFT_FLEET,
	Name: gameSessionName,
	MaximumPlayerSessionCount: MAXIMUM_PLAYERS,
	GameProperties: [
	    {
		"Key": "scalable",
		"Value": "false"
	    }
	]
    });
    let res = await gameLiftClient.send(createGameSessionCommand);
    const gameSession = res.GameSession;

    // once the game session has been created, wait for it to become active
    let status = 'ACTIVATING';
    const searchSessionActiveCommand = new SearchGameSessionsCommand({
	FleetId: GAMELIFT_FLEET,
	FilterExpression: `gameSessionName='${gameSessionName}'`
    });
    while (status !== 'ACTIVE') {
	await new Promise(r => setTimeout(r, 250));
	const res = await gameLiftClient.send(searchSessionActiveCommand);
	if (res.GameSessions.length == 0) continue;
	status = res.GameSessions[0].Status;
    }
    console.log(`Game session '${gameSessionName}' successfully created.`);

    // now the game session is active, we can create our player session
    const createPlayerSessionCommand = new CreatePlayerSessionCommand({
	GameSessionId: gameSession.GameSessionId,
	PlayerId: '1'
    });
    res = await gameLiftClient.send(createPlayerSessionCommand);
    return res.PlayerSession;
}

export async function joinGameWithPlayer(gameSessionName: string): PlayerSession {
    if (!gameLiftClient) initGameLiftClient();
    const searchSessionActiveCommand = new SearchGameSessionsCommand({
	FleetId: GAMELIFT_FLEET,
	FilterExpression: `gameSessionName='${gameSessionName}'`
    });
    let res = await gameLiftClient.send(searchSessionActiveCommand);
    const gameSession = res.GameSessions[0];
    // now the game session is active, we can create our player session
    const createPlayerSessionCommand = new CreatePlayerSessionCommand({
	GameSessionId: gameSession.GameSessionId,
	PlayerId: '2'
    });
    res = await gameLiftClient.send(createPlayerSessionCommand);
    return res.PlayerSession;
}
