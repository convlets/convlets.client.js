///<reference path="IConvletCommand.ts" />
var client = {
    events: [],
    send: function (command) {
        var envelope = new MessageEnvelope(command.typeID, command.id, JSON.stringify(command));
        alert(JSON.stringify(envelope));
    }
};
