/**
 * Taken and modified from react-proxy-loader to support react-router
 * willTransitionTo hooks.  See "BEGIN CHANGE" - "END CHANGE" below.
 */
var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    var chunkName = loaderUtils.interpolateName(this, query.name, {
        context: this.options.context,
        content: remainingRequest,
    }).toLowerCase();

    var moduleRequest = "!!" + remainingRequest;
    return [
        'var React = require("react");',
        'var component;',
        'var desc = {',

        // BEGIN CHANGE
        '    statics: {',
        '        willTransitionTo: function(transition, params, query, callback) {',
        '            require.ensure([], function() {',
        '                var module = require(' + JSON.stringify(moduleRequest) + ');',
        '                component = module.__esModule ? module["default"] : module;',
        '                if (component.willTransitionTo) { ',
        '                    component.willTransitionTo(transition, params, query, callback);',
        '                    if (component.willTransitionTo.length < 4) {',
        '                        callback(); ',
        '                    }',
        '                } ',
        '                else {',
        '                    callback();',
        '                }',
        '            }' + (query.name ? ', ' + JSON.stringify(chunkName) : '') + ');',
        '        },',
        '        willTransitionFrom: function(transition, component, callback) {',
        '            var componentClass = component && component.state ? component.state.component : null;',
        '            if (componentClass && componentClass.willTransitionFrom) {',
        '                componentClass.willTransitionFrom(transition, component.refs["componentProxy"], callback);',
        '                if (componentClass.willTransitionFrom.length < 3) {',
        '                    callback(); ',
        '                }',
        '            }',
        '            else {',
        '                callback();',
        '            }',
        '        }',
        '    }, ',
        // END CHANGE

        '    loadComponent: function(callback) {',
        '        if(!component) {',
        '            require.ensure([], function() {',
        '                var module = require(' + JSON.stringify(moduleRequest) + ');',
        '                component = module.__esModule ? module["default"] : module;',
        '                if(callback) callback(component);',
        '            }' + (query.name ? ', ' + JSON.stringify(chunkName) : '') + ');',
        '        } else if(callback) callback(component);',
        '        return component;',
        '    }',
        '};',
        'var mixinReactProxy = require(' + JSON.stringify(require.resolve("./mixinReactProxy")) + ');',
        'mixinReactProxy(React, desc);',
        'module.exports = React.createClass(desc);',
        'module.exports.Mixin = desc;'
    ].join("\n");
};
