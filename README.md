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
| 0.12.x and above | 0.2.x                     |


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Use when requiring the `handler` for a `Route`, and the component will only be loaded when the route is rendered.

```js
<Route name="user" handler={require('react-router-proxy!./User.jsx')} />
```

Note that `willTransitionTo` and `willTransitionFrom` will still be called on the dynamically-loaded component.

# License

MIT (http://www.opensource.org/licenses/mit-license.php)