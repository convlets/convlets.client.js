/* */ 
"format cjs";
"use strict";

exports.__esModule = true;

/**
 * Takes an array of `types` and flattens them, removing duplicates and
 * returns a `UnionTypeAnnotation` node containg them.
 */

exports.createUnionTypeAnnotation = createUnionTypeAnnotation;
exports.removeTypeDuplicates = removeTypeDuplicates;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _index = require("./index");

var t = _interopRequireWildcard(_index);

function createUnionTypeAnnotation(types) {
  var flattened = removeTypeDuplicates(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return t.unionTypeAnnotation(flattened);
  }
}

function removeTypeDuplicates(nodes) {
  var generics = {};
  var bases = {};

  var types = [];

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (!node) continue;

    // this type matches anything
    if (t.isAnyTypeAnnotation(node)) {
      return [node];
    }

    //
    if (t.isFlowBaseAnnotation(node)) {
      bases[node.type] = node;
      continue;
    }

    //
    if (t.isUnionTypeAnnotation(node)) {
      nodes = nodes.concat(node.types);
      continue;
    }

    // find a matching generic type and merge and deduplicate the type parameters
    if (t.isGenericTypeAnnotation(node)) {
      var _name = node.id.name;

      if (generics[_name]) {
        var existing = generics[_name];
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params));
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics[_name] = node;
      }

      continue;
    }

    types.push(node);
  }

  // add back in bases
  for (var type in bases) {
    types.push(bases[type]);
  }

  // add back in generics
  for (var _name2 in generics) {
    types.push(generics[_name2]);
  }

  return types;
}