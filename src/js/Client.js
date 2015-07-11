///<reference path="IConvletCommand.ts" />
///<reference path="IConvletEvent.ts" />
///<reference path="IConvletFault.ts" />
///<reference path="JSON.ts" />
///<reference path="MessageEnvelope.ts" />
///<reference path="CommandResponse.ts" />
///<reference path="Faults.ts" />
///<reference path="ITranslator.ts" />
///<reference path="ITranslatable.ts" />
///<reference path="../ts/jquery.d.ts" />
var serverUrl = "http://localhost";
var client = {
    events: new Array(),
    faults: new Array(),
    commands: new Array(),
    translations: new Array(),
    send: function (command, callback) {
        var envelope = new MessageEnvelope(command.typeID, command.id, Serializer.serialize(command));
        var data = Serializer.serialize(envelope);
        //Post to server.
        $.ajax({
            type: "POST",
            url: serverUrl + "/api/commands",
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            data: data,
            success: function (response) {
                callback(response);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                var error = "" + thrownError + ", " + xhr.responseText + ", " + xhr.status;
                var response = new CommandResponse(command.id, command.typeID, command.processID, false, [new UnknownFault(command.processID, error)]);
                callback(response);
            }
        });
        // .done(function(data) {
        //   alert(data)
        // })
        // .fail(function() {
        //   alert("Ajax failed to fetch data")
        // });                  	
    },
    registerTranslation: function (translation) {
        client.translations.push(translation);
    },
    translate: function (message) {
        var results = client.translations.filter(function (t) {
            return t.responseTypeID.toLowerCase() == message.typeID.toLowerCase();
        });
        if (results.length > 0) {
            return results[0].format(message);
        }
        else {
            var catchAll = new TranslationCatchAll(client.commands, client.events, client.faults);
            var translation = catchAll.translate(message);
            if (translation) {
                return translation;
            }
            else {
                return "?";
            }
        }
    },
    registerFault: function (faultTypeID) {
        client.faults.push(faultTypeID);
    },
    registerEvent: function (eventTypeID) {
        client.events.push(eventTypeID);
    },
    registerCommand: function (commandTypeID) {
        client.commands.push(commandTypeID);
    },
};
var TranslationCatchAll = (function () {
    function TranslationCatchAll(commands, events, faults) {
        this.commands = commands;
        this.events = events;
        this.faults = faults;
    }
    TranslationCatchAll.prototype.forEvents = function (e) {
        return "";
    };
    TranslationCatchAll.prototype.forFaults = function (e) {
        return "";
    };
    TranslationCatchAll.prototype.forCommandResponses = function (response) {
        return "Your message has been sent";
    };
    TranslationCatchAll.prototype.translate = function (message) {
        if (this.commands.some(function (c) {
            return c.toLowerCase() == message.typeID.toLowerCase();
        })) {
            return this.forCommandResponses(message);
        }
        else if (this.faults.some(function (f) {
            return f.toLowerCase() == message.typeID.toLowerCase();
        })) {
            return this.forFaults(message);
        }
        else if (this.events.some(function (e) {
            return e.toLowerCase() == message.typeID.toLowerCase();
        })) {
            return this.forEvents(message);
        }
        else {
            return "";
        }
    };
    return TranslationCatchAll;
})();
// var message;
//            var statusErrorMap = {
//                '400' : "Server understood the request, but request content was invalid.",
//                '401' : "Unauthorized access.",
//                '403' : "Forbidden resource can't be accessed.",
//                '500' : "Internal server error.",
//                '503' : "Service unavailable."
//            };
//            if (x.status) {
//                message =statusErrorMap[x.status];
//                                if(!message){
//                                      message="Unknown Error \n.";
//                                  }
//            }else if(exception=='parsererror'){
//                message="Error.\nParsing JSON Request failed.";
//            }else if(exception=='timeout'){
//                message="Request Time out.";
//            }else if(exception=='abort'){
//                message="Request was aborted by the server";
//            }else {
//                message="Unknown Error \n.";
//            } 
