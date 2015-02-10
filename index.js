/**
 * Taken and modified from react-proxy-loader to support react-router
 * willTransitionTo hooks.  See "BEGIN CHANGE" - "END CHANGE" below.
 */
module.exports = function() {};
module.exports.pitch = function(remainingRequest) {
    this.cacheable && this.cacheable();
    var moduleRequest = "!!" + remainingRequest;
    return [
        'var React = require("react");',
        'var component;',
        'var desc = {',

        // BEGIN CHANGE
        '    statics: {',
        '        willTransitionTo: function(transition, params, query) {',
        '           var Promise = require("bluebird");',
        '           transition.wait(new Promise(function(resolve) {',
        '                require.ensure([], function() {',
        '                    component = require(' + JSON.stringify(moduleRequest) + ');',
        '                    var resolveNow = true;',
        '                    if (component.willTransitionTo) { ',
        '                        var origWait = transition.wait;',
        '                        transition.wait = function(p) { resolveNow = false; p.then(resolve); }',
        '                        component.willTransitionTo(transition, params, query);',
        '                        transition.wait = origWait;',
        '                    } ',
        '                    resolveNow && resolve();',
        '                });',
        '            }));',
        '        },',
        '        willTransitionFrom: function(transition, params, query) {',
        '            component && component.willTransitionFrom && component.willTransitionFrom(transition, params, query);',
        '        }',
        '    }, ',
        // END CHANGE

        '    loadComponent: function(callback) {',
        '        if(!component) {',
        '            require.ensure([], function() {',
        '                component = require(' + JSON.stringify(moduleRequest) + ');',
        '                if(callback) callback(component);',
        '            });',
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
