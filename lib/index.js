'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = function (component) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!component) {
    throw new Error('\n      [ReactStateless.createClass(component)] stateless needs a component\n    ');
  }

  component = component instanceof Function ? _extends({ render: component }, component) : component;

  if (!('render' in component)) {
    throw new Error('\n      [ReactStateless.createClass(component)] No render function found.\n      "component" should be a render function or contain a render function.\n    ');
  }

  component = _extends({}, component, opts);

  var _component = component;
  var _render = _component.render;

  var displayName = _render.name;

  var methods = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

  var properties = ['propTypes', 'defaultProps', 'getDefaultProps', 'displayName'];

  var spec = _extends({
    displayName: displayName,
    render: function render() {
      return _render(this.props, this);
    }
  }, properties.reduce(function (o, p) {
    if (!(p in component)) return o;
    o[p] = component[p];
    return o;
  }, {}), methods.reduce(function (o, m) {
    if (!(m in component)) return o;
    o[m] = function (input) {
      var _component2;

      if (!this) throw Error('NO CONTEXT');
      var props = this.props;
      var refs = this.refs;

      return (_component2 = component)[m].apply(_component2, _toConsumableArray([props, input, refs, this].filter(Boolean)));
    };
    return o;
  }, {}));

  return _react2['default'].createClass(spec);
};

module.exports = exports['default'];

