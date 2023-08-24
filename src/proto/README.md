## Protobuf definitions
The `_pb.js` files inside this directory were originally taken from a running
GameLift Realtime server by connecting over SSH (following the instructions in
the 'Notes on Debugging the Server' section of [this blog post](https://aws.amazon.com/blogs/gametech/creating-servers-for-multiplayer-mobile-games-with-amazon-gamelift/)).

On the running GameLift Realtime server, these files are located in
`/local/game/src/proto/`, and at the time of writing, the node project they
are contained inside (titled "gamescale-lightweight-server" at `/local/game`)
is at version `1.0.0`.

These compiled protobuf definitions are confirmed accurate as of August 2022,
but since the protobuf sources themselves are not released publicly by Amazon,
these could be rendered invalid if Amazon update their GameLift Realtime
server implementation. It does seem unlikely these files will be updated any
time soon, as the server itself hasn't seen updates in a couple of years now
and is running old versions of many packages.

Some minor changes have been made to the Javascript so that the protobuf
classes are exported in a way that works with ES6-style imports. Alongside
this, some simple Typescript declaration files have been provided so the
entire project can be used with strict typing.
