react-router-proxy-loader
=========================

Based on [react-proxy-loader](https://github.com/webpack/react-proxy-loader), adapted for `react-router` route handlers.

## Installation

`npm install react-router-proxy-loader`

## Dependencies

Which version to use depends on your version of `react-router`

| react-router     | react-router-proxy-loader |
| ---------------- | ------------------------- |
| 0.11.x and below | 0.1.x                     |
| 0.12.x           | 0.2.x                     |
| 0.13.x           | 0.3.x                     |
| 1.x              | 0.4.x                     |
| 2.x and above    | 0.5.x                     |


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `handler` for a `Route`, and the component will only be loaded when the route is rendered.

```js
<Route path="user" component={require('react-router-proxy!./User.jsx')} />
```

Note that in react-router 0.x, `willTransitionTo` and `willTransitionFrom` will be proxied to the dynamically-loaded component.


### Named chunks (0.2.1 and above)

If you have nested or sibling Routes that you want to be loaded together, you can name the components using `?name=chunkName`

```js
<Route path="user" component={require('react-router-proxy?name=user!./User.jsx')}>
    <Route path="details" component={require('react-router-proxy?name=user!./UserDetails.jsx')}>
    <Route path="settings" component={require('react-router-proxy?name=user!./UserSettings.jsx')}>
    <Route path="other" component={require('react-router-proxy?name=user!./UserOther.jsx')}>
</Route>
```

This will cause the `user` chunk to be loaded if any of the three user pages is loaded.
It will also mean that you won't need two separate calls for the base class and child class.

#### Named chunks with placeholders (0.5.1 and above)

You can also use the [standard Webpack placeholders](https://github.com/webpack/loader-utils#interpolatename) in the name of your chunks.

```js
<Route path="details" component={require('react-router-proxy?name=[name]!./UserDetails.jsx')}>
<Route path="settings" component={require('react-router-proxy?name=[name]!./UserSettings.jsx')}>
<Route path="other" component={require('react-router-proxy?name=[name]!./UserOther.jsx')}>
```

Would generate three chunks, exported in `userdetails.js`, `usersettings.js` and so on.
Using this approach allows you to setup your loader globally through an exclude/include rule in your `webpack.config.js`.
To avoid conflicts it may be best to prefix your `name` with a subfolder name, such as `routes/`:

```js
loaders: [
    {
        test: /\.js$/,
        exclude: /src\/Pages/,
        loader: 'babel',
    },
    {
        test: /\.js$/,
        include: /src\/Pages/,
        loaders: ['react-router-proxy?name=routes/[name]', 'babel'],
    }
],
```

This has the advantage of making your router a lot leaner:

```js
<Route path="details" component={require('./UserDetails.jsx')}>
<Route path="settings" component={require('./UserSettings.jsx')}>
<Route path="other" component={require('./UserOther.jsx')}>
```

The generated files would then go into `routes/userdetails`, `routes/usersettings` etc.

## Changelog

##### 0.5.1

 - Added named chunks with placeholders

##### 0.5.0

 - Upgraded to react-router 2.x

##### 0.4.3

 - Using module['default'] for IE8 compatibility

##### 0.4.2

 - Added support for ES6 modules

##### Before 0.4.2

 - See commit history

# License

MIT (http://www.opensource.org/licenses/mit-license.php)
