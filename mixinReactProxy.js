
// Shorter version of https://github.com/sindresorhus/object-assign/blob/master/index.js
var assign = Object.assign || function (target, source) {
    var keys = Object.keys(Object(source));
    for (var i=0; i<keys.length; i++) {
        target[keys[i]] = source[keys[i]];
    }
    return target;
};

module.exports = function(React, desc) {
    desc.displayName = "ReactProxy";
    desc.render = function() {
        var Component = this.state.component;
        if(Component) {
            return React.createElement(Component, assign({ref: "componentProxy"}, this.props), this.props.children);
        } else if(this.renderUnavailable) {
            return this.renderUnavailable();
        } else {
            return null;
        }
    };
    desc.getInitialState = function() {
        return { component: this.loadComponent() };
    };
    desc.componentDidMount = function() {
        if(!this.state.component) {
            this.loadComponent(function(component) {
                this.setState({ component: component });
            }.bind(this));
        }
    };
};