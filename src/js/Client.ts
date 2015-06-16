///<reference path="IConvletCommand.ts" />
///<reference path="JSON.ts" />
///<reference path="../ts/jquery.d.ts" />

var url = "http://localhost:8080/api/commands";
var client = {  
    events: [],
    send: function(command : IConvletCommand) {
        var envelope = 
            new MessageEnvelope(command.typeID, 
                command.id, Serializer.serialize(command));
        var data = Serializer.serialize(envelope);

        //Post to server.
	   $.ajax
	    ({
	        type: "POST",
	        url: url,
	        dataType: 'json',
	        async: false,
	        data: data,
	        success: function () {
	        	alert("Thanks!"); 
	        },
	        error: function(error_text) {
	           alert("Update unsuccessful. Status: " + error_text);
	        }	        
	    });                  	
    }
};