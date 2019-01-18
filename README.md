Voxeet Conference App
=====================

<p align="center">
<img src="https://www.voxeet.com/wp-content/themes/wp-theme/assets/images/logo.svg" alt="Voxeet SDK logo" title="Voxeet SDK logo" width="100"/>
</p>

## Table of contents

  1. [Project setup](#project-setup)
  1. [Initializing the project](#initializing-the-project)
  1. [Running the project](#running-the-project)
  1. [Customise the project](#customise-the-project)
  1. [Tech](#tech)

## Project setup

 - Download the project
 - Get your Voxeet consumerKey and consumerSecret on our portal. ([Developer Portal Voxeet](https://developer.voxeet.com))
 - Put your keys inside src/VoxeetConference.js

## Initializing the project

```bash
     $ yarn install
```

## Running the project

```bash
    $ yarn start
```

The project is now running, go to : https://localhost:8081/

## Building the project (generate bundle file)

```bash
    $ yarn run build
```

## Customise the project

  A lot of configuration are possible for this component.
  All configurations and property are write inside the npm package, feel free to modify the ConferenceRoom inside the react-sample to see how it works !
  ([Voxeet React Components](https://www.npmjs.com/package/@voxeet/react-components))
  This project contains sources of our Voxeet React Components, feel free to customize it !

## Tech

  * [Node version] v10.14.2
  * [Voxeet React Components](https://www.npmjs.com/package/@voxeet/react-components) - The React Component Voxeet Widget
  * [Voxeet Web SDK](https://www.npmjs.com/package/@voxeet/voxeet-web-sdk) - The WEB SDK Voxeet to communicate with Voxeet Servers

© Voxeet, 2019
