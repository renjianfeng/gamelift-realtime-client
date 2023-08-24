# GameLift Realtime Client for Typescript & Javascript

This is an unofficial client library for creating multiplayer TS & JS apps
using AWS GameLift Realtime servers. The official SDK from Amazon only
supports creating client applications using C# (.NET). This library is
modelled after the official SDK, and attempts to provide a comparable
experience for the browser and node with a very similar API.

This library does not attempt to replace the official AWS Javascript SDK for
Gamelift (@aws-sdk/client-gamelift), which can provision game and player
sessions and perform GameLift fleet management tasks. It instead allows a game
client built using web-technologies to communicate with a GameLift Realtime
server and other connected players.

## Usage

After creating a game session and player session (using
@aws-sdk/client-gamelift or similar), players can connect and start sending
messages:

```ts
import { GameLiftRealtimeClient, ConnectionToken, RTMessage } from 'gamelift-realtime-client';

const playerSession = getExistingPlayerSessionFromAwsSdk();

// connect to the player session
const connectionToken: ConnectionToken = {
	serverEndpoint: `wss://${playerSession['DnsName']}:${playerSession['Port']}`,
	playerSessionId: playerSession['PlayerSessionId']
};
const realtimeClient = new GameLiftRealtimeClient(connectionToken);
realtimeClient.connect();

// send messages to other players
const myMessage = realtimeClient.newMessage(OpCodes.MyGameOpCode);
myMessage.targetPlayer = 2; // or leave unset to send to everyone
realtimeClient.sendMessage(myMessage);
```

Clients can subscribe to connection and message events to handle game logic:

```ts
realtimeClient.onLogin.subscribe((session: ClientSession) => {
	console.log("User successfully connected to game session");
});

realtimeClient.onDataReceived.subscribe((message: RTMessage) => {
	if (message.opCode === OpCodes.MyGameOpCode) {
		// do some game logic
	}
});
```

## Running the example

A basic demo is contained within the `examples/basic/` folder of this repository. It
is a vanilla-ts vite app that demonstrates usage of this library.

It creates GameLift Game and Player Sessions using the official API,
authorised with credentials provided by an AWS Cognito role. If you have
followed along with Amazon's ['Mega Frog Race'
example](https://aws.amazon.com/blogs/gametech/creating-servers-for-multiplayer-mobile-games-with-amazon-gamelift/),
you'll notice the setup is quite similar -- although the provisioning that
runs in the Mega Frog Race's Lambdas occurs inside
`examples/basic/src/awsSdkSetup.ts`.

The IAM Role attached to the Cognito Identity Pool you provide must be set up
with permission to execute the `CreateGameSession`, `CreatePlayerSession` and
`SearchGameSessions` GameLift actions. 

> Note that providing access to these actions through an unauthorised client
> like this is only done to quickly demo this library, and should not be used
> in actual production. Extra authentication would be used in the client, or a
> server would handle these actions behind an API.

Provide your `GAMELIFT_FLEET` and `COGNITO_IDENTITY_POOL` IDs and regions in
`examples/basic/src/awsSdkSetup.ts`, then:

```sh
# build the library
npm install
npm run build

# build the example
cd examples/basic/src
npm install
npm run dev
```

On the example page, type in a game session name and click 'Create'.  In
another tab -- or on another machine -- type the same game session name and
click 'Join'.

You should now have two clients communicating via your GameLift Realtime
server. Clicking each client's button will increment their count across all
connected clients.

## TODO

* The player groups API is not yet supported
