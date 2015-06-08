///<reference path="IConvletCommand.ts" />
var client = {
    events: [],
    send: function (command) {
        alert("sending " + command.TypeID);
    }
};
