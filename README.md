# phapi-player Plugin
Extension to @bdsx/bdsx-placeholderapi. Adds a bunch of player placeholders for you to use in your plugin

# How to install
```
npm i @bdsx/phapi-player
```

# How to use
Use it just like you would any other placeholder. You can find a list of the added placeholders [here](https://hastebin.com/vahozaxufa.md);
Example: 
```ts
import { setPlaceholders } from '@bdsx/bdsx-placeholderapi'
events.playerJoin.on((ev) => {
    let player = ev.player;
    broadcast(setPlaceholders("Welcome to the server %player_name%!", player)); 
});
```