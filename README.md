react-router-proxy-loader
=========================

Based on [react-proxy-loader](https://github.com/webpack/react-proxy-loader), adapted for `react-router` route handlers.

## Installation

`npm install react-router-proxy-loader`

## Dependencies

Right now, this library depends on [bluebird](https://github.com/petkaantonov/bluebird) for promises, which is an amazing library.  May be a little heavy, though, so feel free to send a PR if you'd rather it use something else.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `handler` for a `Route`, and the component will only be loaded when the route is rendered.

```js
    <Route name="user" path="/user/:userId" handler={require('react-router-proxy!./User.jsx')} />
```

Note that `willTransitionTo` and `willTransitionFrom` will still be called on the dynamically-loaded component.

# License

MIT (http://www.opensource.org/licenses/mit-license.php)