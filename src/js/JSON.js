///<reference path="Array_ES6Polyfill.ts" />
var Serializer = (function () {
    function Serializer() {
    }
    //http://stackoverflow.com/questions/5480570/json-stringify-change-the-case-of-the-key
    Serializer.serialize = function (entity) {
        return JSON.stringify(entity, function (key, value) {
            if (value && typeof value === 'object') {
                var replacement = {};
                for (var k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        replacement[k.toLowerCase()] = value[k];
                    }
                }
                return replacement;
            }
            return value;
        });
    };
    Serializer.deserialize = function (input, prototype) {
        var properties = new Array();
        for (var propertyName in prototype) {
            properties.push(propertyName);
        }
        return JSON.parse(input, function (key, value) {
            if (value && typeof value === 'object')
                for (var k in value) {
                    var name = properties.find(function (element) {
                        return element.toLowerCase() == k.toLowerCase();
                    });
                    if (name) {
                        value[name] = value[k];
                        delete value[k];
                    }
                }
            return value;
        });
    };
    return Serializer;
})();
