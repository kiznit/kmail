# react-redux-ssr-hmr
React start project with server side rendering and hot module reloading (client and server)

## Why another React Starter Project?

Programmers are very often very opiniated. I can't find anything out there that does everything I want and nothing more. So I've decided to write my own.

What I want:

* Webpack 4 + Babel 7 (let's use the latest and greatest)
* React + Redux: Some plumbing for packages I use in every project
* Server side rendering (SSR): React code should execute on the server and render the initial page to reduce perceived latency (bundles can take a while to load).
* Hot module reloading (HMR): Client-side hot reloading of changed code is a given. What's not common is server side HMR. I want both.


## What is included

* Babel 7
* Express 4
* Webpack 4


## Command line

Yarn. I use yarn. NPM has caused too much grief in my life. I moved to yarn and never looked back. You can install yarn with ```npm install -g yarn```.

### Build production code

    yarn build

### Run production code

    yarn start

### Clean build

    yarn clean
