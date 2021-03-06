/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.AssignmentExpression = AssignmentExpression;
exports.VariableDeclaration = VariableDeclaration;
exports.ForXStatement = ForXStatement;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _messages = require("../../../messages");

var messages = _interopRequireWildcard(_messages);

function checkPath(path, file) {
  var ids = path.getBindingIdentifiers();

  for (var name in ids) {
    var id = ids[name];

    var binding = path.scope.getBinding(name);

    // no binding exists
    if (!binding) continue;

    // not a constant
    if (binding.kind !== "const" && binding.kind !== "module") continue;

    // check if the assignment id matches the constant declaration id
    // if it does then it was the id used to initially declare the
    // constant so we can just ignore it
    if (binding.identifier === id) continue;

    throw file.errorWithNode(id, messages.get("readOnly", name));
  }
}

function AssignmentExpression(node, parent, scope, file) {
  checkPath(this, file);
}

exports.UpdateExpression = AssignmentExpression;

function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}

function ForXStatement(node, parent, scope, file) {
  var left = this.get("left");
  if (left.isIdentifier() || left.isPattern()) {
    checkPath(left, file);
  }
}