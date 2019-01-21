# DARDZ

### Setting up your environment
>*IMPORTANT*: The latest versions of Xcode and Android studio must be installed in order to run the mobile simulators. If Xcode updates in the background of your OS and you try to build this project without opening Xcode and agreeing to the new Terms and Service of the latest version, your build will fail and it will be really confusing as to why. Turtles all the way down...
- Install the latest [Node.js](https://nodejs.org/en/download/)
  - NOTE: installing yarn will install Node.js if Node is not already installed on your machine
- Use [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) for package management and CLI commands:
```sh
brew install yarn
# or, if on an older yarn version
brew upgrade yarn
```
- Install the Expo CLI:
```sh
yarn global add expo-cli
```
- Navigate to the root directory and install `node_modules` and project dependencies:
```sh
yarn
```
- Run the project in a native simulator:
```sh
yarn run ios
# or
yarn run android
```

### Publish to Expo using the Expo DevTools
```sh
# Install the Expo CLI
yarn global expo-cli
```
- To use the Expo browser GUI, run this command in your terminal
```sh
expo start
```

- If you prefer to use the CLI
```sh
expo publish
```

### Building and bundling
- Follow [this tutorial](https://docs.expo.io/versions/latest/distribution/building-standalone-apps) for bundling and building your app
- Follow [this tutorial](https://docs.expo.io/versions/latest/guides/configuration.html) to configure `app.json` when building a new bundle
- To build stand alone JS bundles, respectively:
```sh
expo build:ios
# and
expo build:android
```

### *Outstanding issues*
- [X] When you click `Player Stats` it opens the stats page.

- [X] Add 2 new buttons to the home screen. `Player Stats` and Dardz.com.

- [X] When you click Dardz.com a pop up window should say “Are you sure you want to open Safari?” ‘No’ and ‘Yes’.

- [X] Add new button to the ‘How to Play’ menu. ‘Watch Video’. When you click ‘Watch Video’ a pop up window should say “Are you sure you want to open YouTube?” ‘No’ and ‘Yes’.

- [X] Add a small game clock that starts as soon as you click ‘start game’.

- [X] The text in all of the swooshes needs to be moved down and centered a bit more. That’s all of the players names and the ‘start game’ button.

- [X] I’ve re-written almost all of the instructions, so we’ll have to figure out the best way of getting these replaced.

- [X] When you click ‘end game’ Change pop up window to “Are you sure you want to end the game?” After you click ‘Ok’ another pop up window should say, “Save game scores?” ‘No’ and ‘Yes’  If you click ‘No’ it takes you back to the screen where all of the same player names are still entered so you can play again. If you click ‘Yes’ it takes you to the ‘Player Stats’ page and updates the stats. There should be a back button from the stats page that takes you back to the screen where you can play again.

- [X] When viewing the instructions and swipe from the left of the screen to go back it currently takes you to the home page, but should take you back to the "how to play" menu

- [X] When you click ‘start game’ the first time you use the app, an instruction window should pop up that says, “Click on a player’s name to add points to their score.” Then maybe a button to close the window that says ‘Ok’.

- [X] Alphabitized list of players where you click on a player and it goes to a second screen with "games played" and number of times they've gotten 1st-8th. Players should be searchable

- [X] Revise the splash screen when you click ’start game’ to say, “Click on a players name to change their score. Use the +/- and = buttons."

- [X] Add “Images” button to ‘How to Play’ menu. order from the top. Instructions, Questions & Rules, Images.

- [X] Make (See card layout images) and (See game set up image) link to the images, and add an X or < back button.

- [X] When you click ‘Add Player’ it should work like when you’re searching for a contact in your phone. As soon as you type a letter, any existing players with that letter pop up in a drop down menu. If you click enter after typing a new player name in, it should store that player in the app. We should make it so you can’t have 2 players with the same name.

- [] Check layouts on older iPhone devices

### *Known Bugs*
- [X] When you swipe from the left in any of the instructions modal it should take you to the "How To" screen and not back to the home/splash screen
- [] The number currently getting added/subtracted get pushed down in the calculator

### NOTES:
- See if there can be a user scenario when the app is submitted so the tester can walk through the app in a specific process
- See if we can submit a video example of using the app
- Ensure there is a part of the App Store description that specifies this is paird with a game

### Future features:
- [] Make Instructions and Questions & Rules searchable if possible.