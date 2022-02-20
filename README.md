# React Native

## Requirements

1. OS X - This repo only contains the iOS implementation right now, and Xcode only runs on Mac.
2. New to Xcode? [Download it](https://developer.apple.com/xcode/downloads/) from the Mac App Store.
3. [Homebrew](http://brew.sh/) is the recommended way to install node, watchman, and flow.
4. New to node or npm? `brew install node`
5. We recommend installing [watchman](https://facebook.github.io/watchman/docs/install.html), otherwise you might hit a node file watching bug. `brew install watchman`
6. If you want to use [flow](http://www.flowtype.org), `brew install flow`

## Quick start

Get up and running with our Movies sample app:

1. Once you have the repo cloned and met all the requirements above, start the
   packager that will transform your JS code on-the-fly:

```
npm install
npm start
```

### Libraries and packages

- [redux rematch](https://rematch.netlify.app/)

### Useful links

- https://github.com/reactnativecomponent/react-native-template-rematch-redux
- https://reactnative.dev/docs/components-and-apis -https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
- https://github.com/microsoft/TypeScript-React-Native-Starter -https://reactnative.dev/docs/typescript

### Basics

`<View>` is a container that behaves similar to a `<div>` element on web, but
renders to a `UIView`. `<Text>`, `<Image>`, and `<ScrollView>` are other basic
components and there are several more. You can compose these elements into
component trees just like normal react or HTML elements, and they can be styled
with the `style` property, which supports a subset of flexbox layout. Check out
the UIExplorer examples for more [sample code](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/ScrollViewExample.js).

Native events come in as you would expect via `onChange`, `onScroll`, `onTouch`
and other props. `TouchableHighlight` makes it really easy to build nice buttons
via `onPress`, which plays nicely with scroll views and other interactions via
the responder system.

## Scripts

Run example app tests with:

```
npm test
```

Note: Jest testing does not yet work on node versions after 0.10.x.

Lint the example apps with:

```
npm run lint
```
