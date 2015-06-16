///<reference path="IConvletCommand.ts" />
///<reference path="JSON.ts" />
var client = {
    events: [],
    send: function (command) {
        var envelope = new MessageEnvelope(command.typeID, command.id, Serializer.serialize(command));
        alert(JSON.stringify(envelope));
    }
};
