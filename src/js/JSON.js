var Serializer = (function () {
    function Serializer() {
    }
    //http://stackoverflow.com/questions/5480570/json-stringify-change-the-case-of-the-key
    Serializer.serialize = function (entity) {
        JSON.stringify(entity, function (key, value) {
            if (value && typeof value === 'object') {
                var replacement = {};
                for (var k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                    }
                }
                return replacement;
            }
            return value;
        });
    };
    Serializer.deserialize = function (input) {
        JSON.parse(input, function (key, value) {
            if (value && typeof value === 'object')
                for (var k in value) {
                    if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                        value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                        delete value[k];
                    }
                }
            return value;
        });
    };
    return Serializer;
})();
