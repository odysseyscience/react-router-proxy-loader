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
| 1.x and above    | 0.4.x                     |


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `handler` for a `Route`, and the component will only be loaded when the route is rendered.

```js
<Route name="user" handler={require('react-router-proxy!./User.jsx')} />
```

Note that `willTransitionTo` and `willTransitionFrom` will still be called on the dynamically-loaded component.


### Named chunks (0.2.1 and above)

If you have nested or sibling Routes that you want to be loaded together, you can name the components using `?name=chunkName`

```js
<Route name="user" handler={require('react-router-proxy?name=user!./User.jsx')}>
    <Route name="details" handler={require('react-router-proxy?name=user!./UserDetails.jsx')}>
    <Route name="settings" handler={require('react-router-proxy?name=user!./UserSettings.jsx')}>
    <Route name="other" handler={require('react-router-proxy?name=user!./UserOther.jsx')}>
</Route>
```

This will cause the `user` chunk to be loaded if any of the three user pages is loaded.  It will also mean that you won't need two separate calls for the base class and child class.


## Changelog (Starting at 0.4.2)

##### 0.4.3

 - Using module['default'] for IE8 compatibility

##### 0.4.2

 - Added support for ES6 modules


# License

MIT (http://www.opensource.org/licenses/mit-license.php)
