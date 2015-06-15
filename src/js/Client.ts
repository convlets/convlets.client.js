///<reference path="IConvletCommand.ts" />
var client = {  
    events: [],
    send: function(command : IConvletCommand) {
        alert("sending " + JSON.stringify(command));
    }
};