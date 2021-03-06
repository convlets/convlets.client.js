/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.ObjectExpression = ObjectExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _helpersDefineMap = require("../../helpers/define-map");

var defineMap = _interopRequireWildcard(_helpersDefineMap);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

function ObjectExpression(node, parent, scope, file) {
  var hasAny = false;
  var _arr = node.properties;
  for (var _i = 0; _i < _arr.length; _i++) {
    var prop = _arr[_i];
    if (prop.kind === "get" || prop.kind === "set") {
      hasAny = true;
      break;
    }
  }
  if (!hasAny) return;

  var mutatorMap = {};

  node.properties = node.properties.filter(function (prop) {
    if (prop.kind === "get" || prop.kind === "set") {
      defineMap.push(mutatorMap, prop, prop.kind, file);
      return false;
    } else {
      return true;
    }
  });

  return t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")), [node, defineMap.toDefineObject(mutatorMap)]);
}