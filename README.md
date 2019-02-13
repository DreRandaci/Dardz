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
- [] Check layout/styling on older iPhone devices
- [] Check layout/styling on older Android devices
- [] Update Android version

### *Known Bugs*
- [] When two or more players tie, game placement is determined by player name. There should be a tie breaking algorithm

- [] when selecting a autocomplete name in "Create Game", you have to click twice. Should only have to click once

### Future features:
- [] Make Instructions and Questions & Rules searchable